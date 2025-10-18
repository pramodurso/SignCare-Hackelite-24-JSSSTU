import React from 'react';

interface UPIInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const UPIInput: React.FC<UPIInputProps> = ({ value, onChange, onSubmit }) => {
  return (
    <div className="w-full max-w-md">
      <label htmlFor="upi" className="block text-sm font-medium text-gray-700 mb-2">
        Enter UPI ID
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          id="upi"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="example@upi"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Pay
        </button>
      </div>
    </div>
  );
};