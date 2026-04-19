import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Star, Loader2, Trash2, Edit3 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Props {
  courseId: string;
}

const StarRating = ({
  value,
  onChange,
  size = 24,
  readonly = false,
}: {
  value: number;
  onChange?: (n: number) => void;
  size?: number;
  readonly?: boolean;
}) => {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="flex items-center gap-1" onMouseLeave={() => setHover(null)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = (hover ?? value) >= n;
        return (
          <button
            key={n}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(n)}
            onMouseEnter={() => !readonly && setHover(n)}
            className={`transition-transform ${readonly ? "cursor-default" : "hover:scale-110 cursor-pointer"}`}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            <Star
              style={{ width: size, height: size }}
              className={filled ? "text-amber-300 fill-amber-300" : "text-grey-brand/30"}
            />
          </button>
        );
      })}
    </div>
  );
};

const ReviewsSection = ({ courseId }: Props) => {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews-full", courseId],
    queryFn: async () => {
      const { data: rs } = await supabase
        .from("reviews")
        .select("*")
        .eq("course_id", courseId)
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      const list = rs ?? [];
      if (list.length === 0) return [];
      const ids = Array.from(new Set(list.map((r: any) => r.user_id)));
      const { data: profs } = await supabase
        .from("profiles")
        .select("user_id, full_name, avatar_url")
        .in("user_id", ids);
      const map = new Map((profs ?? []).map((p: any) => [p.user_id, p]));
      return list.map((r: any) => ({ ...r, author: map.get(r.user_id) }));
    },
  });

  const myReview = reviews?.find((r: any) => r.user_id === user?.id);

  const submit = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      const payload = { user_id: user.id, course_id: courseId, rating, comment: comment.trim() || null };
      if (myReview && editing) {
        const { error } = await supabase
          .from("reviews")
          .update({ rating, comment: comment.trim() || null })
          .eq("id", myReview.id);
        if (error) throw error;
      } else if (myReview) {
        return;
      } else {
        const { error } = await supabase.from("reviews").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? "Review updated" : "Thanks for your review");
      setEditing(false);
      setComment("");
      qc.invalidateQueries({ queryKey: ["reviews-full", courseId] });
      qc.invalidateQueries({ queryKey: ["course", undefined] });
    },
    onError: (e: any) => toast.error(e?.message || "Could not submit review"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Review deleted");
      qc.invalidateQueries({ queryKey: ["reviews-full", courseId] });
    },
  });

  const startEdit = () => {
    if (!myReview) return;
    setEditing(true);
    setRating(myReview.rating);
    setComment(myReview.comment || "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    submit.mutate(undefined, { onSettled: () => setSubmitting(false) });
  };

  const avg =
    reviews && reviews.length > 0
      ? reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length
      : 0;

  const distribution = [5, 4, 3, 2, 1].map((n) => ({
    n,
    count: reviews?.filter((r: any) => r.rating === n).length ?? 0,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Summary + form */}
      <div className="space-y-8">
        <div className="bg-[#4D0B00] rounded-2xl p-6">
          <div className="text-center mb-5">
            <div className="font-heading font-light text-grey-brand text-6xl mb-2">
              {avg > 0 ? avg.toFixed(1) : "—"}
            </div>
            <StarRating value={Math.round(avg)} readonly size={20} />
            <div className="text-grey-brand/55 text-sm font-sans mt-2">
              {reviews?.length ?? 0} review{(reviews?.length ?? 0) !== 1 ? "s" : ""}
            </div>
          </div>
          <div className="space-y-2">
            {distribution.map((d) => {
              const pct = reviews && reviews.length > 0 ? (d.count / reviews.length) * 100 : 0;
              return (
                <div key={d.n} className="flex items-center gap-2 text-xs font-sans">
                  <span className="text-grey-brand/65 w-3">{d.n}</span>
                  <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                  <div className="flex-1 h-1.5 rounded-full bg-grey-brand/10 overflow-hidden">
                    <div className="h-full bg-amber-300" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-grey-brand/55 w-6 text-right">{d.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review form */}
        {user ? (
          (myReview && !editing) ? (
            <div className="bg-[#4D0B00] rounded-2xl p-6">
              <div className="text-grey-brand/60 text-xs uppercase tracking-widest font-sans mb-3">
                Your review
              </div>
              <StarRating value={myReview.rating} readonly size={18} />
              {myReview.comment && (
                <p className="text-grey-brand/85 font-sans text-sm mt-3 leading-relaxed">
                  {myReview.comment}
                </p>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={startEdit}
                  className="text-xs text-grey-brand/70 hover:text-red-accent flex items-center gap-1.5 font-sans"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove.mutate(myReview.id)}
                  className="text-xs text-grey-brand/70 hover:text-red-accent flex items-center gap-1.5 font-sans"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#4D0B00] rounded-2xl p-6">
              <div className="text-grey-brand font-heading text-xl mb-4 font-light">
                {editing ? "Edit your review" : "Write a review"}
              </div>
              <div className="mb-4">
                <StarRating value={rating} onChange={setRating} size={28} />
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share what you loved (optional)"
                rows={4}
                className="w-full bg-accent-maroon-dark/60 border border-grey-brand/15 rounded-lg p-3 text-grey-brand font-sans text-sm placeholder:text-grey-brand/40 focus:border-red-accent/60 focus:outline-none mb-4 resize-none"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="primary-btn maroon no-margin text-grey-brand inline-flex items-center gap-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>{editing ? "Save changes" : "Submit review"}</span>
                  )}
                </button>
                {editing && (
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="text-grey-brand/60 text-sm font-sans hover:text-grey-brand"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )
        ) : (
          <div className="bg-[#4D0B00] rounded-2xl p-6 text-center">
            <p className="text-grey-brand/70 font-sans text-sm mb-3">
              Sign in to leave a review
            </p>
            <Link to="/auth" className="primary-btn maroon no-margin text-grey-brand inline-flex">
              <span>Sign in</span>
            </Link>
          </div>
        )}
      </div>

      {/* Review list */}
      <div className="lg:col-span-2">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 text-red-accent animate-spin" />
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((r: any) => (
              <div key={r.id} className="bg-[#4D0B00]/70 rounded-xl p-5">
                <div className="flex items-start gap-3 mb-3">
                  {r.author?.avatar_url ? (
                    <img
                      src={r.author.avatar_url}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-red-accent/20 flex items-center justify-center text-grey-brand font-heading">
                      {(r.author?.full_name || "U")[0].toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-grey-brand font-sans text-sm font-semibold">
                      {r.author?.full_name || "Student"}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StarRating value={r.rating} readonly size={13} />
                      <span className="text-grey-brand/45 text-[11px] font-sans">
                        {new Date(r.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                {r.comment && (
                  <p className="text-grey-brand/85 font-sans text-sm leading-relaxed">
                    {r.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#4D0B00]/40 rounded-2xl p-10 text-center">
            <p className="text-grey-brand/65 font-heading text-xl mb-1">No reviews yet</p>
            <p className="text-grey-brand/50 font-sans text-sm">
              Be the first to share your experience.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
