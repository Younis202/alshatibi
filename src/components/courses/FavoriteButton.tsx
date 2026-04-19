import { Heart, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useFavoriteIds, useToggleFavorite } from "@/hooks/useGamification";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  courseId: string;
  size?: "sm" | "md" | "lg";
  variant?: "overlay" | "inline";
}

const SIZES = {
  sm: { btn: "w-8 h-8", icon: "w-4 h-4" },
  md: { btn: "w-9 h-9", icon: "w-[18px] h-[18px]" },
  lg: { btn: "w-11 h-11", icon: "w-5 h-5" },
};

const FavoriteButton = ({ courseId, size = "md", variant = "overlay" }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: favIds } = useFavoriteIds(user?.id);
  const toggle = useToggleFavorite(user?.id);
  const isFav = favIds?.has(courseId) ?? false;
  const s = SIZES[size];

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/auth");
      return;
    }
    toggle.mutate(
      { courseId, isFav },
      {
        onSuccess: () => toast.success(isFav ? "Removed from favorites" : "Added to favorites"),
        onError: () => toast.error("Could not update favorites"),
      }
    );
  };

  const base =
    variant === "overlay"
      ? "absolute top-3 right-3 bg-black/60 backdrop-blur-sm hover:bg-black/80"
      : "bg-grey-brand/10 hover:bg-grey-brand/20";

  return (
    <button
      type="button"
      onClick={handle}
      disabled={toggle.isPending}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      className={`${base} ${s.btn} z-20 rounded-full flex items-center justify-center transition-all`}
    >
      {toggle.isPending ? (
        <Loader2 className={`${s.icon} text-grey-brand animate-spin`} />
      ) : (
        <Heart
          className={`${s.icon} transition-all ${
            isFav ? "text-red-accent fill-red-accent" : "text-grey-brand"
          }`}
        />
      )}
    </button>
  );
};

export default FavoriteButton;
