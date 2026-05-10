import {
  talkArticle,
  talkContent,
  talkVideo,
  talkParagraphs,
  talkMeta,
  dot,
  talkMedia,
} from "./Talk.css";

export type TalkProps = {
  date: string;
  eventName: string;
  talkTopic: string;
  location: string;
  videoUrl: string;
};

export const Talk = (talk: TalkProps) => {
  return (
    <article className={talkArticle}>
      <div className={talkMedia}>
        <iframe
          className={talkVideo}
          src={talk.videoUrl}
          loading="lazy"
          frameBorder="0"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          title={talk.talkTopic}
        />
      </div>
      <div className={talkContent}>
        <p className={talkParagraphs}>{talk.eventName}</p>
        <h3>{talk.talkTopic}</h3>
        <div className={talkMeta}>
          <span>{talk.location}</span>
          <span className={dot}>/</span>
          <span>{talk.date}</span>
        </div>
      </div>
    </article>
  );
};
