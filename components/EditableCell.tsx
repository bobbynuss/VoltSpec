"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil, ArrowUpCircle, Check } from "lucide-react";

interface EditableCellProps {
  value: string;
  originalValue: string;
  onSave: (newValue: string) => void;
  onSuggestMaster?: (oldValue: string, newValue: string) => void;
  className?: string;
  isEditable: boolean;
  isEdited?: boolean;
}

export function EditableCell({
  value,
  originalValue,
  onSave,
  onSuggestMaster,
  className = "",
  isEditable,
  isEdited = false,
}: EditableCellProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [suggested, setSuggested] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  // Sync external value changes
  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  if (!isEditable) {
    return (
      <span className={className}>
        {isEdited && <span className="text-purple-400 mr-1" title="Edited by collaborator">•</span>}
        {value}
      </span>
    );
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          setEditing(false);
          if (draft.trim() !== value) {
            onSave(draft.trim());
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setEditing(false);
            if (draft.trim() !== value) {
              onSave(draft.trim());
            }
          }
          if (e.key === "Escape") {
            setEditing(false);
            setDraft(value);
          }
        }}
        className="w-full px-1.5 py-0.5 rounded text-xs bg-purple-500/10 border border-purple-400/40 text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
      />
    );
  }

  const hasChange = value !== originalValue;

  return (
    <span className="inline-flex items-center gap-1">
      <span
        onClick={() => setEditing(true)}
        className={`group cursor-pointer hover:bg-purple-400/5 rounded px-1 -mx-1 transition-colors ${className}`}
        title="Click to edit"
      >
        {isEdited && <span className="text-purple-400 mr-1" title="Edited by collaborator">•</span>}
        {value}
        <Pencil className="w-2.5 h-2.5 text-purple-400/40 group-hover:text-purple-400 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      </span>
      {hasChange && onSuggestMaster && !suggested && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSuggestMaster(originalValue, value);
            setSuggested(true);
            setTimeout(() => setSuggested(false), 5000);
          }}
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 border border-amber-400/30 transition-colors cursor-pointer whitespace-nowrap"
          title="Suggest this correction as an official update to VoltSpec master data"
        >
          <ArrowUpCircle className="w-2.5 h-2.5" />
          Update Master
        </button>
      )}
      {hasChange && suggested && (
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-green-400/10 text-green-400 border border-green-400/30 whitespace-nowrap">
          <Check className="w-2.5 h-2.5" />
          Submitted
        </span>
      )}
    </span>
  );
}
