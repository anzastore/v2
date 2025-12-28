'use client';

import { useState } from 'react';
import { Plus, Trash2, GripVertical, Type, List, Hash } from 'lucide-react';

export interface FieldDefinition {
    id: string;
    label: string;
    type: 'text' | 'number' | 'dropdown';
    placeholder?: string;
    options?: string; // Comma separated for dropdowns
    required: boolean;
}

interface InputSchemaBuilderProps {
    value: FieldDefinition[];
    onChange: (fields: FieldDefinition[]) => void;
}

export default function InputSchemaBuilder({ value = [], onChange }: InputSchemaBuilderProps) {
    const addField = () => {
        const newField: FieldDefinition = {
            id: crypto.randomUUID(),
            label: 'New Field',
            type: 'text',
            placeholder: '',
            required: true,
        };
        onChange([...value, newField]);
    };

    const removeField = (id: string) => {
        onChange(value.filter(f => f.id !== id));
    };

    const updateField = (id: string, updates: Partial<FieldDefinition>) => {
        onChange(value.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Input Fields Configuration</h3>
                <button
                    type="button"
                    onClick={addField}
                    className="text-xs font-bold text-yellow-500 hover:text-yellow-400 flex items-center gap-1"
                >
                    <Plus className="w-3 h-3" />
                    ADD FIELD
                </button>
            </div>

            {value.length === 0 && (
                <div className="p-8 border-2 border-dashed border-white/5 rounded-xl text-center">
                    <p className="text-zinc-500 text-sm">No input fields defined.</p>
                    <p className="text-zinc-600 text-xs mt-1">Add fields like "User ID" or "Server ID" so users know what to enter.</p>
                </div>
            )}

            <div className="space-y-3">
                {value.map((field, index) => (
                    <div key={field.id} className="group bg-[#0a0a0a] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all">
                        <div className="flex items-start gap-3">
                            <div className="mt-3 text-zinc-600 cursor-move">
                                <GripVertical className="w-4 h-4" />
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-zinc-500 mb-1 block">Label</label>
                                    <input
                                        type="text"
                                        value={field.label}
                                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                                        className="w-full bg-zinc-900/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:border-yellow-500/50 focus:outline-none"
                                        placeholder="e.g. User ID"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-zinc-500 mb-1 block">Type</label>
                                    <div className="flex bg-zinc-900/50 rounded-lg p-1 border border-white/5">
                                        {[
                                            { id: 'text', icon: Type, label: 'Text' },
                                            { id: 'number', icon: Hash, label: 'Number' },
                                            { id: 'dropdown', icon: List, label: 'Select' }
                                        ].map(type => (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => updateField(field.id, { type: type.id as any })}
                                                className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-bold transition-all ${field.type === type.id ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                                            >
                                                <type.icon className="w-3 h-3" />
                                                <span className="hidden sm:inline">{type.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="md:col-span-2 flex gap-4">
                                    <div className="flex-1">
                                        <label className="text-xs text-zinc-500 mb-1 block">Placeholder</label>
                                        <input
                                            type="text"
                                            value={field.placeholder || ''}
                                            onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                            className="w-full bg-zinc-900/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:border-yellow-500/50 focus:outline-none"
                                            placeholder="e.g. 12345678"
                                        />
                                    </div>
                                    {field.type === 'dropdown' && (
                                        <div className="flex-1">
                                            <label className="text-xs text-zinc-500 mb-1 block">Options (comma separated)</label>
                                            <input
                                                type="text"
                                                value={field.options || ''}
                                                onChange={(e) => updateField(field.id, { options: e.target.value })}
                                                className="w-full bg-zinc-900/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:border-yellow-500/50 focus:outline-none"
                                                placeholder="Asia, Europe, USA"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => removeField(field.id)}
                                className="mt-3 p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
