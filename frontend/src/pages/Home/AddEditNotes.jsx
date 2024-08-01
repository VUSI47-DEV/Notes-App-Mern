import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";

const AddEditNotes = ({ noteData, type, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError] = useState();


  // Add New Note
  const addNewNote = async () =>{

  }

   // Add Edit Note
   const editNote = async () =>{
    
   }


  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title ⚠️");
      return;
    }
    if (!content) {
      setError("Please add content ⚠️");
      return;
    }
    setError("");

    if(type === 'edit'){
      editNote();
    }
    else{
      addNewNote();
    }

  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500"
        onClick={onClose}>
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label" htmlFor="">
          TITLE
        </label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym at 5"
          value={title}
          // Research-- 'target'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <label htmlFor="" className="input-label">
          CONTENT
        </label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-noe bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className="mt-3">
        <label htmlFor="" className="">
          TAGS
        </label>
        <TagInput tags={tags} setTags={setTags} />

        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

        <button
          className="btn-primary font-meduim mt-5 p-3"
          onClick={handleAddNote}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
