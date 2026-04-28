import React, { useState } from 'react';
import { Plus, Type, CheckSquare, List } from 'lucide-react';

interface Block {
  id: string;
  type: 'text' | 'todo' | 'bullet';
  content: string;
  checked?: boolean;
}

const BlockEditor = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', type: 'text', content: 'Welcome to Synapse' },
    { id: '2', type: 'todo', content: 'Set up your workspace', checked: false },
    { id: '3', type: 'bullet', content: 'Plan your week' },
  ]);

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
  };

  const toggleTodo = (id: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, checked: !b.checked } : b));
  };

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: '',
      checked: false,
    };
    setBlocks([...blocks, newBlock]);
  };

  return (
    <div className="flex-1 p-12 bg-white overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <input
          className="w-full text-4xl font-bold text-[#37352F] outline-none mb-8 placeholder-gray-200"
          placeholder="Untitled"
          defaultValue="My Workspace"
        />

        <div className="flex flex-col gap-2">
          {blocks.map((block) => (
            <div key={block.id} className="flex items-start gap-3 group">
              {block.type === 'todo' && (
                <button
                  onClick={() => toggleTodo(block.id)}
                  className={`mt-1 w-4 h-4 rounded border-2 shrink-0 transition-colors ${
                    block.checked ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                  }`}
                />
              )}
              {block.type === 'bullet' && (
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
              )}
              <input
                className={`w-full outline-none text-[#37352F] bg-transparent placeholder-gray-300 ${
                  block.type === 'text' ? 'text-base' : 'text-sm'
                } ${block.checked ? 'line-through text-gray-400' : ''}`}
                value={block.content}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                placeholder="Type something..."
              />
            </div>
          ))}
        </div>

        {/* Add Block Buttons */}
        <div className="flex items-center gap-2 mt-6 opacity-0 hover:opacity-100 transition-opacity">
          <span className="text-xs text-gray-400 mr-1">Add</span>
          {[
            { type: 'text' as const, icon: Type, label: 'Text' },
            { type: 'todo' as const, icon: CheckSquare, label: 'Todo' },
            { type: 'bullet' as const, icon: List, label: 'List' },
          ].map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => addBlock(type)}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockEditor;
