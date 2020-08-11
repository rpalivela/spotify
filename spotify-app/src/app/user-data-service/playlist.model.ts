import { User } from '../user-data-service/user.model';

export interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: {key: string;
                    value: string;};
    href: string;
    id: string;
    images: {height: number;
             url: string;
             width: number;};
    name: string;
    owner: User;
    public: boolean;
    snapshot_id: string;
    tracks: {href: string;
             total: number;};
    type: string;
    uri: string;
}
