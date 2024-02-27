// 24-02-25

import { useMemo, useState } from "react";

// https://usehooks.com/uselocalstorage
import { useLocalStorage } from "@uidotdev/usehooks";

export default function App() {
  const { ideas, addIdea } = useBlogIdeas();
  const [activeLabel, setActiveLabel] = useState("");

  const filterIdeas = useMemo(() => {
    return activeLabel
      ? ideas.filter((idea) => idea.content.includes(activeLabel))
      : ideas;
  }, [ideas, activeLabel]);

  return (
    <>
      <div>
        <button onClick={() => setActiveLabel("")}>All</button>
        <span>{activeLabel ? activeLabel : ""}</span>
      </div>
      <IdeaAdd onAdd={addIdea} />
      <IdeaList ideas={filterIdeas} onLabelClick={setActiveLabel} />
    </>
  );
}

const IdeaList = ({ ideas = [], onLabelClick }) => {
  const to = (text = "") => {
    const tagPattern = /(?<=\s|^)#[^#^\s]+(?=\s|$)/g;
    const html = text.replace(
      tagPattern,
      `<button class="label" data-label="$&">$&</button>`
    );
    return html;
  };

  const handleLabelClick = (e) => {
    if (e.target.classList.contains("label")) {
      console.log(e.target.dataset.label);
      onLabelClick(e.target.dataset.label);
    }
  };

  return (
    <>
      <h2>Idea List</h2>
      <ul onClick={handleLabelClick}>
        {ideas.map((idea) => (
          <li key={idea.id}>
            <p dangerouslySetInnerHTML={{ __html: to(idea.content) }}></p>
          </li>
        ))}
      </ul>
    </>
  );
};

const IdeaAdd = ({ onAdd }) => {
  const [content, setContent] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (content.trim()) {
            onAdd({ content });
            setContent("");
          }
        }}
      >
        <input
          type="text"
          placeholder="new blog idea..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </>
  );
};

//
const useBlogIdeas = () => {
  const [ideas, setIdeas] = useLocalStorage("ideas", []);

  const addIdea = ({ content }) => {
    const id = crypto.randomUUID();
    const idea = { id, content };
    setIdeas([...ideas, idea]);
  };

  return { ideas, addIdea };
};
