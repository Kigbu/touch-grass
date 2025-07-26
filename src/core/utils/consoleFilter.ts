// Console filter utility to suppress warnings from external libraries

if (typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  // Filter out specific warnings we want to suppress
  console.error = (...args: unknown[]) => {
    const message = args.join(' ');

    // Suppress Radix UI accessibility warnings from Sequence Connect
    if (message.includes('DialogContent requires a DialogTitle') ||
      message.includes('DialogTitle') ||
      message.includes('VisuallyHidden')) {
      return; // Don't log these warnings
    }

    originalConsoleError.apply(console, args);
  };

  console.warn = (...args: unknown[]) => {
    const message = args.join(' ');

    // Suppress Radix UI accessibility warnings from Sequence Connect
    if (message.includes('DialogContent requires a DialogTitle') ||
      message.includes('DialogTitle') ||
      message.includes('VisuallyHidden')) {
      return; // Don't log these warnings
    }

    originalConsoleWarn.apply(console, args);
  };
}