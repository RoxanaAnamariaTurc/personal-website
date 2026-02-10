import {
  loadingWrapper,
  loadingText,
  skeletonGrid,
  skeletonCard,
  skeletonImage,
  skeletonTitle,
  skeletonDescription,
  skeletonDescriptionShort,
  skeletonTags,
  skeletonTag,
} from "./ProjectsLoading.css";

const SkeletonCard = () => (
  <div className={skeletonCard}>
    <div className={skeletonImage} />
    <div className={skeletonTitle} />
    <div className={skeletonDescription} />
    <div className={skeletonDescriptionShort} />
    <div className={skeletonTags}>
      <div className={skeletonTag} />
      <div className={skeletonTag} />
      <div className={skeletonTag} />
    </div>
  </div>
);

export const ProjectsLoading = () => (
  <div className={loadingWrapper}>
    <p className={loadingText}>Loading projects...</p>
    <div className={skeletonGrid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);
