import { talksData } from "../../../data/talksData";
import { Talk } from "./talk/Talk";
import { talksSection, talksTitle, talksDiv } from "./Talks.css";

export const Talks = () => {
  return (
    <section className={talksSection} id="talks">
      <h2 className={talksTitle}>Talks</h2>
      <div className={talksDiv}>
        {talksData.map((talk) => (
          <Talk
            key={`${talk.eventName}-${talk.date}`}
            talkTopic={talk.talkTopic}
            eventName={talk.eventName}
            location={talk.location}
            date={talk.date}
            videoUrl={talk.videoUrl}
          />
        ))}
      </div>
    </section>
  );
};
