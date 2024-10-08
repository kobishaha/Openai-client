import React from 'react';
import { Settings as SettingsType } from '../types';

interface SettingsPanelProps {
  settings: SettingsType;
  models: { id: string; name: string }[];
  handleSettingChange: (setting: keyof SettingsType, value: string | number) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  models,
  handleSettingChange,
}) => {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Model</label>
          <select
            value={settings.selectedModel}
            onChange={(e) => handleSettingChange('selectedModel', e.target.value)}
            className="w-full bg-gray-700 rounded px-3 py-2"
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Temperature: {settings.temperature}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.temperature}
            onChange={(e) => handleSettingChange('temperature', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Max Tokens</label>
          <input
            type="number"
            value={settings.maxTokens}
            onChange={(e) => handleSettingChange('maxTokens', parseInt(e.target.value))}
            className="w-full bg-gray-700 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2">Top P: {settings.topP}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.topP}
            onChange={(e) => handleSettingChange('topP', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Frequency Penalty: {settings.frequencyPenalty}</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.frequencyPenalty}
            onChange={(e) => handleSettingChange('frequencyPenalty', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Presence Penalty: {settings.presencePenalty}</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.presencePenalty}
            onChange={(e) => handleSettingChange('presencePenalty', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;