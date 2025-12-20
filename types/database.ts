export type ButtonStyle = 'rounded-full' | 'rounded-none' | 'rounded-2xl';
export type ThemeColor = 'blue' | 'red' | 'green' | 'purple' | 'pink' | 'gray';

export interface Profile {
    id?: string;
    created_at?: string;
    username: string;
    full_name: string;
    bio: string | null;
    avatar_url: string | null;
    theme_color: ThemeColor;
    button_style: ButtonStyle;
    design_config?: {
        layout?: 'classic' | 'bento' | 'minimal';
        entrance_effect?: 'none' | 'sword_slash';
        colors?: {
            primary?: string;
            background?: string;
            cardBg?: string;
            cardBorder?: string;
        };
        shapes?: {
            button?: string;
            card?: string;
        };
    };
}

export interface Link {
    id: string;
    created_at?: string;
    user_id?: string;
    label: string;
    url: string;
    is_highlighted: boolean;
    sort_order: number;
}
