import React from 'react';

export function Link({ href, children }) {
  return (
    <a
      href={href}
      className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
    >
      {children}
    </a>
  );
}