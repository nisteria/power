// Analytics Tracking - Privacy Focused
export const analytics = {
  track(event: string, data?: Record<string, any>) {
    if (typeof window === 'undefined') return;
    
    // Only in production
    if (process.env.NODE_ENV === 'development') return;
    
    console.log('[Analytics]', event, data);
  },

  page(path: string) {
    this.track('page_view', { path });
  },

  buttonClick(name: string) {
    this.track('button_click', { name });
  },

  formSubmit(form: string) {
    this.track('form_submit', { form });
  },

  error(message: string, stack?: string) {
    this.track('error', { message, stack });
  },
};
