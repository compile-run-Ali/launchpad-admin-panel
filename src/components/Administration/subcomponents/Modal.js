import React from "react";

export default function Modal({
  tagList,
  selectedTags,
  toggleTag,
  confirmEditTags,
  setSelectedPool,
  setTagModal,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-3 rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4 dark:text-white text-dark-3">
          Edit Tags
        </h2>
        <ul className="flex flex-wrap gap-2">
          {tagList.map((tag) => (
            <li
              key={tag}
              className={`rounded-full px-4 py-2 text-sm font-semibold cursor-pointer ${
                selectedTags.includes(tag)
                  ? "dark:bg-white text-white bg-black dark:text-black"
                  : "dark:text-white text-black"
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 dark:bg-white text-white bg-black dark:text-black rounded-md hover:bg-blue-600 mr-2"
            onClick={confirmEditTags}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 dark:bg-white text-white bg-black dark:text-black rounded-md hover:bg-blue-600"
            onClick={() => {
              setSelectedPool(null);
              setTagModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
