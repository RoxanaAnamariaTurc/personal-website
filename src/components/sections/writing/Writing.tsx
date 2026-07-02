import { writingPosts } from "../../../data/writingData";
import {
  articleBody,
  articleFigure,
  articleGrid,
  articleHero,
  detailPanel,
  metaList,
  postCard,
  postContent,
  postHeader,
  postImage,
  postSummary,
  postTags,
  sectionIntro,
  sectionTitle,
  stepList,
  writingGrid,
  writingSection,
} from "./Writing.css";

export const Writing = () => (
  <section id="writing" className={writingSection}>
    <div className={sectionIntro}>
      <p>Writing</p>
      <h2 className={sectionTitle}>Notes, workshops, and things I figured out</h2>
    </div>

    <div className={writingGrid}>
      {writingPosts.map((post) => (
        <article className={postCard} key={post.id}>
          <img className={postImage} src={post.heroImage} alt={post.heroAlt} />
          <div className={postContent}>
            <div className={postHeader}>
              <p>{post.eyebrow}</p>
              <span>{post.date}</span>
            </div>
            <h3>{post.title}</h3>
            <p className={postSummary}>{post.summary}</p>
            <ul className={postTags} aria-label="Post tags">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <details className={detailPanel}>
              <summary>
                <span>Read more</span>
                <span>Read less</span>
              </summary>
              {renderPostArticle(post.id)}
            </details>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const renderPostArticle = (postId: string) => {
  if (postId === "jsnation-react-summit-amsterdam-2026") {
    return <AmsterdamConferenceArticle />;
  }

  if (postId === "grafana-friends-london-grafanacon-2026-recap") {
    return <GrafanaConRecapArticle />;
  }

  return <TraitorsWorkshopArticle />;
};

const AmsterdamConferenceArticle = () => (
  <div className={articleGrid}>
    <div className={articleBody}>
      <p>
        I attended JSNation on June 11 and React Summit on June 12 in
        Amsterdam, thanks to the GitNation scholarship program. It was my first
        frontend conference of this size, and I wanted to come back with a
        clearer sense of where frontend engineering is going.
      </p>

      <p>
        The biggest theme I noticed was that frontend is not only about writing
        UI code. It is also about the tools, platforms, workflows, and product
        decisions that shape how teams build user interfaces at scale.
      </p>

      <h4>1. Tools feel different when you meet the people building them</h4>
      <p>
        One of my favorite parts was speaking to people from companies building
        tools I actually use at work. I had a great chat with the AG Grid team,
        found out about AG Studio, and also spoke with people from Highcharts.
        Learning about AG Studio gave me some good ideas for design and UI/UX
        patterns that I could use in my own projects, especially around how
        complex data tools can still feel approachable.
      </p>
      <p>
        There is something useful about giving feedback directly to the people
        behind a tool you use every week. It connects the everyday work of
        building tables, charts, and product screens with the decisions behind
        those products.
      </p>

      <h4>2. Frontend at scale is about making the right path easier</h4>
      <p>
        A few talks stayed with me because they connected frontend to bigger
        engineering questions. Misha Kazakov&apos;s{" "}
        <strong>Walking the Netflix Paved Road</strong>, was interesting
        because it framed platform engineering as more than shared code. It is
        also adoption, migration, coordination, and making the right path easier
        for teams to follow.
      </p>
      <p>
        Alex Garrett-Smith&apos;s talk,{" "}
        <strong>We Need More Than Prompts</strong>, made a similar point from a
        different angle. AI is not only about clever prompts. It also needs
        clear context, constraints, examples, and a shared understanding of what
        the system should do. That felt relevant to how I use AI while learning
        and building: the output gets much better when I explain the project,
        the constraints, and what I am trying to understand.
      </p>

      <h4>3. React Compiler made fundamentals feel more important, not less</h4>
      <p>
        The React Compiler talk from Mark Erikson was another one I found
        useful. React Compiler can automatically optimize React apps by handling
        some of the memoization work developers often do manually with{" "}
        <code>useMemo</code>, <code>useCallback</code>, and{" "}
        <code>React.memo</code>.
      </p>
      <p>
        What I liked is that the message was not "the compiler means you do not
        need to understand React anymore." It was almost the opposite. Better
        tooling still relies on code following React&apos;s rules, so fundamentals
        still matter.
      </p>

      <h4>Community and familiar faces</h4>
      <p>
        The community side was just as valuable. I met people through small
        conversations between talks, and I also got to see Grafana people and
        previous colleagues. Conferences can be intense, but familiar faces made
        the whole thing feel more grounded.
      </p>

      <h4>What I took away</h4>
      <ul>
        <li>
          Meeting tool builders helps connect daily engineering work with the
          product decisions behind those tools.
        </li>
        <li>
          Platform engineering is also about helping teams move in the same
          direction without slowing them down.
        </li>
        <li>
          React fundamentals still matter, especially as compilers and AI tools
          get better.
        </li>
        <li>
          Good conferences are not only about talks. The small conversations
          between sessions can be just as valuable.
        </li>
      </ul>

      <p>
        I came back with a few stickers, but the more useful takeaway was a
        clearer reminder that frontend engineering is not just components and
        frameworks. It is also tooling, platform decisions, product constraints,
        and the people building the systems we rely on.
      </p>

      <h4>Further reading</h4>
      <ul>
        <li>
          <a href="https://jsnation.com/" target="_blank" rel="noreferrer">
            JSNation
          </a>
        </li>
        <li>
          <a href="https://reactsummit.com/" target="_blank" rel="noreferrer">
            React Summit
          </a>
        </li>
        <li>
          <a href="https://www.ag-grid.com/" target="_blank" rel="noreferrer">
            AG Grid
          </a>
        </li>
        <li>
          <a
            href="https://www.highcharts.com/"
            target="_blank"
            rel="noreferrer"
          >
            Highcharts
          </a>
        </li>
        <li>
          <a
            href="https://react.dev/learn/react-compiler"
            target="_blank"
            rel="noreferrer"
          >
            React Compiler docs
          </a>
        </li>
      </ul>
    </div>

    <aside className={articleHero} aria-label="JSNation and React Summit photos">
      <figure className={articleFigure}>
        <img
          src="/assets/images/jsnation-react-summit-2026-collage.jpg"
          alt="Collage of JSNation and React Summit Amsterdam 2026 photos, including conference stages, stickers, talks, and a React Summit mug."
        />
        <figcaption>
          A few moments from JSNation and React Summit 2026 in Amsterdam:
          talks, tools, community, and the first big frontend conference
          feeling.
        </figcaption>
      </figure>
      <ul className={metaList}>
        <li>Events: JSNation and React Summit</li>
        <li>Location: Amsterdam</li>
        <li>Dates: June 11 and June 12, 2026</li>
        <li>Supported by: GitNation scholarship program</li>
      </ul>
    </aside>
  </div>
);

const GrafanaConRecapArticle = () => (
  <div className={articleGrid}>
    <div className={articleBody}>
      <p>
        As part of being a Grafana Champion, I helped organize the Grafana &
        Friends London meetup at BNY, where the community came together for a
        recap of GrafanaCON 2026 in Barcelona. I wanted to understand what
        stood out from Grafana 13 and what those updates say about where
        Grafana is going.
      </p>

      <p>
        Dee Kitchen and Thanos Karachalios from Grafana Labs walked through a
        set of updates across dashboards, Git workflows, learning experiences,
        and AI. The updates connected in a nice way for me: make dashboards
        easier to organize, make them easier to manage as part of engineering
        workflows, and make Grafana easier to learn while you are using it.
      </p>

      <h4>1. Dynamic dashboards</h4>
      <p>
        Dynamic dashboards were one of my favorite updates because they solve a
        very real dashboard problem: things get long and hard to scan. Tabs,
        rows, nested layouts, and conditional sections make dashboards feel more
        like a workspace for related questions instead of one giant wall of
        panels.
      </p>
      <figure className={articleFigure}>
        <img
          src="https://grafana.com/media/docs/grafana/dashboards/screenshot-dashboard-edit-v13.0.png"
          alt="Grafana dashboard edit view showing dynamic rows, tabs, and row visibility controls."
        />
        <figcaption>
          Dynamic dashboards make it easier to organize panels into tabs, rows,
          and conditional sections. Image source:{" "}
          <a
            href="https://grafana.com/whats-new/2026-04-08-dynamic-dashboards-is-now-generally-available/"
            target="_blank"
            rel="noreferrer"
          >
            Grafana Labs
          </a>
          .
        </figcaption>
      </figure>

      <h4>2. Git Sync and dashboards as code</h4>
      <p>
        Git Sync stood out because it makes dashboards feel less separate from
        the rest of a software system. If dashboard JSON can live in Git, teams
        can bring in familiar habits like pull requests, history, review,
        recovery, and CI/CD. That matters when dashboards become shared
        operational tools, not just personal views.
      </p>

      <h4>3. Interactive learning and Grafana Assistant</h4>
      <p>
        The third thing I liked was the focus on learning inside the product.
        Interactive learning and Grafana Assistant both point in the same
        direction: help people build, understand telemetry data, and get unstuck
        without constantly leaving Grafana. That feels useful for teams, and
        also for anyone new who wants a clearer way into the product.
      </p>
      <figure className={articleFigure}>
        <img
          src="https://grafana.com/media/interactive-learning/interactive-learning-1.png"
          alt="Grafana home screen showing an interactive learning help panel and guided setup instructions."
        />
        <figcaption>
          In-product learning stood out because it reduces context switching
          while someone is trying to build or debug. Image source:{" "}
          <a
            href="https://grafana.com/whats-new/2025-11-18-interactive-learning-in-grafana/"
            target="_blank"
            rel="noreferrer"
          >
            Grafana Labs
          </a>
          .
        </figcaption>
      </figure>

      <h4>My takeaways</h4>
      <ul>
        <li>Grafana is making dashboards easier to scan, organize, and maintain.</li>
        <li>
          Dashboards are moving closer to normal engineering workflows through
          Git, version control, and review.
        </li>
        <li>
          Learning inside the product can help both experienced teams and new
          users build confidence faster.
        </li>
      </ul>

      <h4>Further reading</h4>
      <ul>
        <li>
          <a
            href="https://grafana.com/docs/grafana/latest/whatsnew/whats-new-in-v13-0/"
            target="_blank"
            rel="noreferrer"
          >
            Grafana 13 release notes
          </a>
        </li>
        <li>
          <a
            href="https://grafana.com/whats-new/2026-04-08-dynamic-dashboards-is-now-generally-available/"
            target="_blank"
            rel="noreferrer"
          >
            Dynamic dashboards announcement
          </a>
        </li>
        <li>
          <a
            href="https://grafana.com/docs/grafana/latest/as-code/observability-as-code/git-sync/"
            target="_blank"
            rel="noreferrer"
          >
            Git Sync documentation
          </a>
        </li>
        <li>
          <a
            href="https://grafana.com/whats-new/2025-11-18-interactive-learning-in-grafana/"
            target="_blank"
            rel="noreferrer"
          >
            Interactive learning in Grafana
          </a>
        </li>
        <li>
          <a
            href="https://grafana.com/whats-new/2026-04-21-grafana-assistant-becomes-available-on-prem/"
            target="_blank"
            rel="noreferrer"
          >
            Grafana Assistant on-prem announcement
          </a>
        </li>
      </ul>
    </div>
  </div>
);

const TraitorsWorkshopArticle = () => (
  <div className={articleGrid}>
    <div className={articleBody}>
      <p>
        I attended a Grafana workshop guided by Simon Prickett, a Grafana
        Developer Advocate, where we built a Traitors-inspired dashboard using
        Grafana and SQL. I wanted to better understand how spreadsheet data can
        become something useful, visual, and easier to explore.
      </p>

      <p>
        The workshop showed how Grafana and SQL queries can be used to work with
        a Google Sheet and turn that data into dashboards. It was a practical
        reminder that data does not always start in a perfect backend system.
        Sometimes it starts in a spreadsheet, and the useful part is knowing how
        to query it, shape it, and explain it clearly.
      </p>

      <p>
        I had the chance to follow the workshop materials step by step, but what
        I enjoyed most was helping people around me. Because I already have some
        experience with Grafana, I could share what I knew, answer questions,
        and help others get unstuck.
      </p>

      <p>
        That part meant a lot to me. It reminded me that learning is not only
        about understanding something for yourself. Sometimes you learn just as
        much by explaining it to someone else and noticing where the confusing
        parts are.
      </p>

      <p>
        This workshop was part of an initiative from Marie Cruz in collaboration
        with Coding Black Females, helping support and propel the careers of
        people interested in tech and observability. I left feeling grateful to
        have been part of it, and I hope I get more opportunities like this in
        the future.
      </p>

      <h4>What we built</h4>
      <p>
        The goal was to take Traitors-style episode data from a spreadsheet,
        connect it to Grafana, and use SQL to ask questions that could become
        dashboard panels. Instead of treating the spreadsheet as a static table,
        Grafana made it possible to inspect the data, transform it, and choose a
        visualization that matched the question.
      </p>

      <h4>Connecting Google Sheets to Grafana</h4>
      <p>
        To work with a Google Sheet in Grafana, you first need to install the
        Google Sheets data source plugin. In the Grafana menu, go to the data
        source or connections area, search for{" "}
        <code>grafana-googlesheets-datasource</code>, select the Google Sheets
        data source, and install it.
      </p>
      <p>
        Before you can use the data source in a dashboard, it needs to be
        configured. Grafana gives step-by-step instructions in the configuration
        screen based on the authentication method you choose, such as a service
        account, an API key, or another supported setup. Once the connection is
        configured and the save-and-test step succeeds, the data source is ready
        to use.
      </p>
      <ol className={stepList}>
        <li>Prepare the spreadsheet in Google Drive.</li>
        <li>Install the Google Sheets data source plugin in Grafana.</li>
        <li>
          Configure the data source and follow Grafana&apos;s authentication
          instructions for the setup you choose.
          <figure className={articleFigure}>
            <img
              src="/assets/images/traitors-google-sheets-config.png"
              alt="Grafana Google Sheets data source configuration screen showing authentication options and Save and test."
            />
            <figcaption>
              Grafana shows configuration guidance based on the authentication
              type you select.
            </figcaption>
          </figure>
        </li>
        <li>Go to Dashboards, create a new dashboard, and add a new panel.</li>
        <li>Select the configured Google Sheets data source for the panel query.</li>
        <li>
          Add the spreadsheet ID or URL, choose the range you want Grafana to
          read, and run the query so the sheet data appears in the panel.
        </li>
        <li>
          If you want to transform the returned data with SQL, use Grafana&apos;s
          Expressions control and choose the SQL expression type. Grafana starts
          with a default query row, which you can replace with the query you
          need.
          <figure className={articleFigure}>
            <img
              src="/assets/images/traitors-sql-expression-menu.png"
              alt="Grafana panel editor showing the Expression menu with SQL selected as an option."
            />
            <figcaption>
              The Expression menu is where the SQL expression option appears.
            </figcaption>
          </figure>
        </li>
        <li>
          Use the visualization options on the right side of the panel editor to
          switch between tables, charts, stats, and other views until the data
          is easy to read.
        </li>
      </ol>

      <h4>Example SQL questions</h4>
      <p>
        Once the sheet data is available in Grafana, the useful part is deciding
        what question the panel should answer. For example, I could start with a
        broad query to inspect the shape of the data, then narrow it down into
        something more dashboard-friendly.
      </p>
      <ul>
        <li>
          Show the first rows: <code>SELECT * FROM A LIMIT 10</code>
        </li>
        <li>
          Count appearances per player:{" "}
          <code>
            SELECT player, COUNT(*) AS appearances FROM A GROUP BY player ORDER
            BY appearances DESC
          </code>
        </li>
        <li>
          Compare statuses by episode:{" "}
          <code>
            SELECT episode, status, COUNT(*) AS total FROM A GROUP BY episode,
            status
          </code>
        </li>
      </ul>
      <figure className={articleFigure}>
        <img
          src="/assets/images/traitors-sql-expression-editor.png"
          alt="Grafana SQL expression editor showing a SELECT query and schema inspector with Traitors spreadsheet fields."
        />
        <figcaption>
          The SQL expression editor lets you inspect the returned fields and
          write a query against the panel data.
        </figcaption>
      </figure>

      <h4>Final takeaways</h4>
      <ul>
        <li>Grafana can be useful even when the data starts in a spreadsheet.</li>
        <li>SQL makes it easier to ask better questions of the data.</li>
        <li>Dashboards are clearer when the query, panel, and story match.</li>
        <li>
          A good workshop is not only about following steps. Helping other
          people debug their setup is a practical way to test what I actually
          understand.
        </li>
      </ul>
    </div>

    <aside className={articleHero} aria-label="Traitors workshop dashboard">
      <figure className={articleFigure}>
        <img
          src="/assets/images/traitors-workshop-dashboard.png"
          alt="Grafana dashboard built during the Traitors SQL expressions workshop, showing SQL expression tables, bar charts, and player spotlight panels."
        />
        <figcaption>
          The finished Traitors workshop dashboard after adding SQL expression
          panels, a player selector, and a player spotlight section.
        </figcaption>
      </figure>
      <ul className={metaList}>
        <li>Workshop: Traitors Dashboard with Grafana and SQL</li>
        <li>Speaker: Simon Prickett</li>
        <li>Initiative: Marie Cruz and Coding Black Females</li>
      </ul>
    </aside>
  </div>
);
