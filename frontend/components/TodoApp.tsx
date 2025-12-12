"use client";

import React, { useState, useEffect } from 'react';
import { Plus, ListTodo } from 'lucide-react';
import { Task, FilterType } from '@/types/todo';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TodoItem } from '@/components/TodoItem';
import { TodoFilter } from '@/components/TodoFilter';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function TodoApp() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todos', []);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Sort by newest first
  const sortedTasks = [...filteredTasks].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const addTask = () => {
    if (!inputValue.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: inputValue.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title: newTitle } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(activeTasks);
  };

  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/20">
              <ListTodo className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Tasks updated , hell yeah</h1>
          </div>

          <div className="flex gap-3 mb-8">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done?"
              className="text-lg"
              autoFocus
            />
            <Button onClick={addTask} size="lg" className="px-6">
              <Plus size={24} />
            </Button>
          </div>

          <div className="space-y-1 min-h-[200px]">
            {sortedTasks.length > 0 ? (
              sortedTasks.map(task => (
                <TodoItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onEdit={editTask}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-slate-400 text-center">
                {filter === 'all' && (
                  <>
                    <p className="text-lg font-medium text-white mb-2">No tasks yet</p>
                    <p>Add a task above to get started!</p>
                  </>
                )}
                {filter === 'active' && <p>No active tasks!</p>}
                {filter === 'completed' && <p>No completed tasks yet!</p>}
              </div>
            )}
          </div>

          <TodoFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            activeCount={activeTasks.length}
            onClearCompleted={clearCompleted}
            hasCompleted={completedTasks.length > 0}
          />
        </div>
      </div>
      
      <div className="mt-8 text-center text-slate-500 text-sm">
        <p>Double-click to edit a task</p>
      </div>
    </div>
  );
}
