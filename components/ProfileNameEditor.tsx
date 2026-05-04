"use client";

import { useState } from "react";
import { updateProfileAction } from "../app/auth/actions";

type ProfileNameEditorProps = {
  displayName: string;
};

export default function ProfileNameEditor({
  displayName,
}: ProfileNameEditorProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <dt className="text-sm text-gray-500">Имя</dt>
          <dd className="mt-1 truncate text-lg font-semibold">{displayName}</dd>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing((current) => !current)}
          className="shrink-0 rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-black hover:bg-black hover:text-white"
        >
          {isEditing ? "Скрыть" : "Изменить"}
        </button>
      </div>

      {isEditing ? (
        <form action={updateProfileAction} className="mt-4">
          <label htmlFor="full_name" className="sr-only">
            Новое имя
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="full_name"
              name="full_name"
              type="text"
              defaultValue={displayName}
              required
              maxLength={40}
              autoFocus
              className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black"
            />
            <button
              type="submit"
              className="rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Сохранить
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

