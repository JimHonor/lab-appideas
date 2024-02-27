import { useState } from "react";

export default function App() {
  const options = {
    start: 7,
    end: 23,
  };

  const { tasks, addTask } = useTasks();

  return (
    <>
      <h1>Don't waste your time!</h1>
      <div className=" flex">
        <div>
          <p>Timeline</p>
          <Timeline start={options.start} end={options.end} />
          <p>
            到 {options.end}:00, 只剩 {remainingTime(options.end)}h
          </p>
        </div>
        <div>
          <p>To do list</p>
          <TaskAdd onAdd={(options) => addTask(options)} />
          {tasks.length > 0 ? <TaskList tasks={tasks} /> : <p>Empty</p>}
        </div>
      </div>
    </>
  );
}

// 一天24小时，但只显示 awake time，比如 7：00-23：00
// 以小时为单位，已经过去的时间灰度显示
const Timeline = ({ start = 0, end = 24 }) => {
  const blocks = Array.from({ length: end - start }, (_, i) => i + start);

  return (
    <ul className="w-60">
      {blocks.map((block) => (
        <li className="mb-0.5 grid grid-cols-2 text-center" key={block}>
          <div
            className={`mb-0.5 ${
              isActiveTime(block) ? "bg-green-700" : "bg-slate-100"
            }`}
          >
            {format(block)}
          </div>
          <div
            className={`${
              isActiveTime(block) ? "text-black" : "text-gray-500"
            }`}
          >
            1h
          </div>
        </li>
      ))}
    </ul>
  );
};

//
const isActiveTime = (start) => {
  const h = new Date().getHours();
  return start >= h;
};

const format = (start) => {
  return `${start}:00-${start + 1}:00`;
};

const remainingTime = (end) => {
  const h = new Date().getHours();
  return end - h;
};

//

const TaskAdd = ({ onAdd }) => {
  const [content, setContent] = useState("");

  return (
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
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </form>
  );
};

const TaskList = ({ tasks = [] }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.content}</li>
      ))}
    </ul>
  );
};

//
const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = ({ content }) => {
    const id = crypto.randomUUID();
    const task = { id, content };
    setTasks([...tasks, task]);
  };

  return { tasks, addTask };
};

//
const Settings = () => {
  return (
    <>
      <div>
        <p>start day at:</p>
        <p>end day at:</p>
      </div>
    </>
  );
};
