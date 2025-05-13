import React from 'react';

interface MultiSelectProps<T> {
  options: T[];
  value: T[];
  onChange: (selected: T[]) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string | number;
  label?: string;
  placeholder?: string;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

function MultiSelect<T>({
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
  label,
  placeholder = 'Sélectionner...',
  isLoading = false,
  error,
  className = '',
}: MultiSelectProps<T>) {
  const isSelected = (option: T) => {
    return value.some(
      (item) => getOptionValue(item) === getOptionValue(option)
    );
  };

  const handleToggleOption = (option: T) => {
    if (isSelected(option)) {
      onChange(
        value.filter(
          (item) => getOptionValue(item) !== getOptionValue(option)
        )
      );
    } else {
      onChange([...value, option]);
    }
  };

  const id = React.useId();

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className={`
            bg-white border ${error ? 'border-red-300' : 'border-gray-300'} 
            rounded-md shadow-sm w-full min-h-10 p-1
          `}
        >
          <div className="flex flex-wrap gap-1 mb-1">
            {value.length > 0 ? (
              value.map((item) => (
                <span
                  key={getOptionValue(item).toString()}
                  className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {getOptionLabel(item)}
                  <button
                    type="button"
                    className="ml-1 inline-flex text-blue-400 hover:text-blue-600"
                    onClick={() => handleToggleOption(item)}
                  >
                    <span className="sr-only">Retirer</span>
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              ))
            ) : (
              <span className="text-gray-500 p-1">{placeholder}</span>
            )}
          </div>
          <div className="max-h-60 overflow-auto">
            {isLoading ? (
              <div className="py-2 px-3 text-center text-gray-500">
                Chargement...
              </div>
            ) : options.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {options.map((option) => {
                  const isActive = isSelected(option);
                  return (
                    <div
                      key={getOptionValue(option).toString()}
                      className={`
                        flex items-center px-3 py-2 text-sm cursor-pointer
                        ${isActive ? 'bg-blue-50' : 'hover:bg-gray-100'}
                      `}
                      onClick={() => handleToggleOption(option)}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={isActive}
                        onChange={() => {}}
                        id={`${id}-${getOptionValue(option)}`}
                      />
                      <label
                        htmlFor={`${id}-${getOptionValue(option)}`}
                        className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        {getOptionLabel(option)}
                      </label>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-2 px-3 text-center text-gray-500">
                Aucune option disponible
              </div>
            )}
          </div>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default MultiSelect;