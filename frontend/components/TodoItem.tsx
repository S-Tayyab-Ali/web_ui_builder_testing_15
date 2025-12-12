"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { Task } from '@/types/todo';
import { Checkbox } from '@/components/ui/Checkbox';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export function TodoItem({ task, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(task.id, editValue.trim());
      setIsEditing(false);
    } else {
      setEditValue(task.title);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div 
      className={cn(
        "group flex items-center justify-between p-4 mb-3 rounded-xl border transition-all duration-300",
        task.completed 
          ? "bg-white/5 border-white/5" 
          : "bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-0.5"
      )}
    >
      <div className="flex items-center flex-1 gap-4 min-w-0">
        <Checkbox 
          checked={task.completed} 
          onCheckedChange={() => onToggle(task.id)}
        />
        
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className="flex-1 bg-transparent border-b border-blue-500 text-white focus:outline-none py-1"
            />
          </div>
        ) : (
          <span 
            className={cn(
              "flex-1 text-lg truncate cursor-pointer transition-all duration-300 select-none",
              task.completed ? "text-slate-500 line-through" : "text-white"
            )}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
              aria-label="Edit task"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              aria-label="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </>
        ) : (
          <button
            onClick={handleSave}
            className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
          >
            <Check size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
