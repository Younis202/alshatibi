import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useLessonQuestions } from "@/hooks/useGamification";
import {
  MessageCircle,
  Loader2,
  CheckCircle2,
  Send,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

interface Props {
  lessonId: string;
  courseId: string;
}

const TimeAgo = ({ date }: { date: string }) => {
  const d = new Date(date);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return <>just now</>;
  if (diff < 3600) return <>{Math.floor(diff / 60)}m ago</>;
  if (diff < 86400) return <>{Math.floor(diff / 3600)}h ago</>;
  if (diff < 86400 * 7) return <>{Math.floor(diff / 86400)}d ago</>;
  return <>{d.toLocaleDateString()}</>;
};

const Avatar = ({ author, size = 36 }: { author: any; size?: number }) => {
  if (author?.avatar_url) {
    return (
      <img
        src={author.avatar_url}
        alt=""
        style={{ width: size, height: size }}
        className="rounded-full object-cover flex-shrink-0"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-red-accent/20 flex items-center justify-center text-grey-brand font-heading flex-shrink-0"
    >
      {(author?.full_name || "U")[0].toUpperCase()}
    </div>
  );
};

const QASection = ({ lessonId, courseId }: Props) => {
  const { user, hasRole } = useAuth();
  const qc = useQueryClient();
  const { data: questions, isLoading } = useLessonQuestions(lessonId);
  const [body, setBody] = useState("");
  const [replyOpen, setReplyOpen] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const askMut = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      const text = body.trim();
      if (!text) throw new Error("Question cannot be empty");
      const { error } = await supabase
        .from("lesson_questions")
        .insert({ user_id: user.id, lesson_id: lessonId, course_id: courseId, body: text });
      if (error) throw error;
    },
    onSuccess: () => {
      setBody("");
      qc.invalidateQueries({ queryKey: ["lesson-questions", lessonId] });
      toast.success("Question posted");
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });

  const replyMut = useMutation({
    mutationFn: async (qid: string) => {
      if (!user) throw new Error("Not authenticated");
      const text = reply.trim();
      if (!text) throw new Error("Reply cannot be empty");
      const { error } = await supabase
        .from("lesson_answers")
        .insert({ user_id: user.id, question_id: qid, body: text });
      if (error) throw error;
    },
    onSuccess: () => {
      setReply("");
      setReplyOpen(null);
      qc.invalidateQueries({ queryKey: ["lesson-questions", lessonId] });
      toast.success("Reply posted");
    },
    onError: (e: any) => toast.error(e?.message || "Failed"),
  });

  const deleteQ = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("lesson_questions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lesson-questions", lessonId] });
      toast.success("Deleted");
    },
  });

  const deleteA = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("lesson_answers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lesson-questions", lessonId] });
    },
  });

  const resolve = useMutation({
    mutationFn: async ({ id, val }: { id: string; val: boolean }) => {
      const { error } = await supabase
        .from("lesson_questions")
        .update({ is_resolved: val })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lesson-questions", lessonId] }),
  });

  return (
    <section className="mt-12 pt-8 border-t border-grey-brand/10">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-5 h-5 text-red-accent" />
        <h2 className="font-heading font-light text-grey-brand text-2xl md:text-3xl">
          Questions & Answers
        </h2>
        <span className="text-grey-brand/50 text-sm font-sans">
          {questions?.length ?? 0}
        </span>
      </div>

      {/* Ask form */}
      {user ? (
        <div className="bg-[#4D0B00] rounded-2xl p-5 mb-6">
          <div className="flex gap-3">
            <Avatar author={{ full_name: user.email }} size={36} />
            <div className="flex-1">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Ask the instructor or fellow students…"
                rows={3}
                className="w-full bg-accent-maroon-dark/60 border border-grey-brand/15 rounded-lg p-3 text-grey-brand text-sm font-sans placeholder:text-grey-brand/40 focus:border-red-accent/60 focus:outline-none resize-none"
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => askMut.mutate()}
                  disabled={askMut.isPending || !body.trim()}
                  className="primary-btn maroon no-margin text-grey-brand inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {askMut.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Ask</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#4D0B00]/60 rounded-xl p-5 mb-6 text-grey-brand/65 text-sm font-sans">
          Sign in to ask a question.
        </div>
      )}

      {/* Questions */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 text-red-accent animate-spin" />
        </div>
      ) : questions && questions.length > 0 ? (
        <div className="space-y-4">
          {questions.map((q: any) => {
            const mine = user?.id === q.user_id;
            const canModerate = mine || hasRole?.("admin");
            return (
              <article
                key={q.id}
                className={`bg-[#4D0B00] rounded-2xl p-5 ${q.is_resolved ? "border border-emerald-300/30" : ""}`}
              >
                <header className="flex items-start gap-3 mb-3">
                  <Avatar author={q.author} size={36} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-grey-brand font-sans text-sm font-semibold">
                        {q.author?.full_name || "Student"}
                      </span>
                      <span className="text-grey-brand/45 text-xs font-sans">
                        <TimeAgo date={q.created_at} />
                      </span>
                      {q.is_resolved && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-300/15 text-emerald-300 text-[10px] font-sans uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Resolved
                        </span>
                      )}
                    </div>
                    <p className="text-grey-brand/90 font-sans text-sm leading-relaxed mt-1.5 whitespace-pre-wrap">
                      {q.body}
                    </p>
                  </div>
                  {canModerate && (
                    <button
                      onClick={() => deleteQ.mutate(q.id)}
                      className="text-grey-brand/40 hover:text-red-accent transition-colors"
                      aria-label="Delete question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </header>

                {/* Answers */}
                {q.answers && q.answers.length > 0 && (
                  <div className="ml-5 md:ml-12 mt-4 space-y-3 border-l-2 border-grey-brand/10 pl-4">
                    {q.answers.map((a: any) => {
                      const aMine = user?.id === a.user_id;
                      const aCan = aMine || hasRole?.("admin");
                      return (
                        <div key={a.id} className="flex items-start gap-2.5">
                          <Avatar author={a.author} size={28} />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-grey-brand font-sans text-xs font-semibold">
                                {a.author?.full_name || "Student"}
                              </span>
                              {a.is_instructor_answer && (
                                <span className="px-1.5 py-0.5 rounded bg-red-accent/15 text-red-accent text-[10px] font-sans uppercase tracking-wider flex items-center gap-1">
                                  <ShieldCheck className="w-2.5 h-2.5" /> Instructor
                                </span>
                              )}
                              <span className="text-grey-brand/45 text-[11px] font-sans">
                                <TimeAgo date={a.created_at} />
                              </span>
                            </div>
                            <p className="text-grey-brand/85 font-sans text-sm leading-relaxed mt-1 whitespace-pre-wrap">
                              {a.body}
                            </p>
                          </div>
                          {aCan && (
                            <button
                              onClick={() => deleteA.mutate(a.id)}
                              className="text-grey-brand/40 hover:text-red-accent"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Actions */}
                <footer className="flex items-center gap-3 mt-4 pt-3 border-t border-grey-brand/10 text-xs font-sans">
                  {user && (
                    <button
                      onClick={() => {
                        setReplyOpen(replyOpen === q.id ? null : q.id);
                        setReply("");
                      }}
                      className="text-grey-brand/65 hover:text-red-accent transition-colors"
                    >
                      Reply
                    </button>
                  )}
                  {(mine || hasRole?.("admin")) && (
                    <button
                      onClick={() => resolve.mutate({ id: q.id, val: !q.is_resolved })}
                      className="text-grey-brand/65 hover:text-emerald-300 transition-colors"
                    >
                      {q.is_resolved ? "Reopen" : "Mark resolved"}
                    </button>
                  )}
                </footer>

                {replyOpen === q.id && user && (
                  <div className="mt-3 flex gap-2">
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Write a reply…"
                      rows={2}
                      className="flex-1 bg-accent-maroon-dark/60 border border-grey-brand/15 rounded-lg p-2.5 text-grey-brand text-sm font-sans placeholder:text-grey-brand/40 focus:border-red-accent/60 focus:outline-none resize-none"
                    />
                    <button
                      onClick={() => replyMut.mutate(q.id)}
                      disabled={replyMut.isPending || !reply.trim()}
                      className="primary-btn maroon no-margin text-grey-brand self-end inline-flex disabled:opacity-50"
                    >
                      {replyMut.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#4D0B00]/40 rounded-2xl p-10 text-center">
          <MessageCircle className="w-8 h-8 text-grey-brand/30 mx-auto mb-3" />
          <p className="text-grey-brand/65 font-heading text-xl mb-1">No questions yet</p>
          <p className="text-grey-brand/50 font-sans text-sm">
            Be the first to ask — your question helps everyone.
          </p>
        </div>
      )}
    </section>
  );
};

export default QASection;
