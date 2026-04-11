import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "md-tabs": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { activeTabIndex?: number; onChange?: (e: any) => void }, HTMLElement>;
      "md-primary-tab": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "md-filled-button": React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLElement> & { disabled?: boolean }, HTMLElement>;
      "md-outlined-button": React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLElement> & { disabled?: boolean }, HTMLElement>;
      "md-text-button": React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLElement>, HTMLElement>;
      "md-outlined-text-field": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { label?: string; value?: string }, HTMLElement>;
      "md-checkbox": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { checked?: boolean }, HTMLElement>;
    }
  }
}
