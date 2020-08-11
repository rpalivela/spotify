export interface Track {
    artists: {external_urls: {key: string;
                              value: string;};
              href: string;
              id: string;
              name: string;
              type: string;
              uri: string;
             }[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: {key: string;
                    value: string;};
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: {external_urls: {key: string;
                                  value: string;};
                  href: string;
                  id: string;
                  type: string;
                  uri: string;
                 };
    restrictions: {reason: string;};
    name: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}