import {
  talkArticle,
  talkVideo,
  talkParagraphs,
  talkMeta,
  dot,
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
      <iframe
        className={talkVideo}
        src={talk.videoUrl}
        loading="lazy"
        frameBorder="0"
        allow="fullscreen; picture-in-picture"
        allowFullScreen
        title="Talk video"
      ></iframe>
      <h3>{talk.talkTopic}</h3>
      <p className={talkParagraphs}>{talk.eventName}</p>
      <div className={talkMeta}>
        <span className={talkParagraphs}>{talk.location}</span>
        <span className={dot}>•</span>
        <span className={talkParagraphs}>{talk.date}</span>
      </div>
    </article>
  );
};
