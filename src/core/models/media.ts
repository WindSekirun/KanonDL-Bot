export declare module Media {

    export interface RequestedFormat {
        protocol: string;
        format_note: string;
        vcodec: string;
        ext: string;
        asr?: number;
        http_headers: any;
        tbr: number;
        fps?: number;
        downloader_options: DownloaderOptions;
        format_id: string;
        width?: number;
        format: string;
        filesize: number;
        player_url?: any;
        acodec: string;
        height?: number;
        url: string;
        abr?: number;
    }

    export interface Format {
        protocol: string;
        format_note: string;
        player_url?: any;
        ext: string;
        asr?: number;
        http_headers: any;
        tbr: number;
        fps?: number;
        abr: number;
        height?: number;
        format_id: string;
        width?: number;
        format: string;
        vcodec: string;
        filesize: number;
        downloader_options: DownloaderOptions;
        acodec: string;
        url: string;
        container: string;
    }

    export interface DownloaderOptions {
        http_chunk_size: number;
    }

    export interface Thumbnail {
        id: string;
        url: string;
    }

    export interface Subtitles {
    }

    export interface AutomaticCaptions {
    }

    export interface Info {
        stretched_ratio?: any;
        annotations?: any;
        uploader_id: string;
        tags: string[];
        release_date?: any;
        width: number;
        fps: number;
        requested_formats: RequestedFormat[];
        requested_subtitles?: any;
        resolution?: any;
        playlist?: any;
        view_count: number;
        average_rating: number;
        is_live?: any;
        display_id: string;
        ext: string;
        abr: number;
        series?: any;
        like_count: number;
        format_id: string;
        webpage_url_basename: string;
        uploader_url: string;
        format: string;
        artist?: any;
        end_time?: any;
        formats: Format[];
        license?: any;
        acodec: string;
        chapters?: any;
        upload_date: string;
        season_number?: any;
        release_year?: any;
        age_limit: number;
        channel_id: string;
        track?: any;
        categories: string[];
        playlist_index?: any;
        episode_number?: any;
        thumbnail: string;
        thumbnails: Thumbnail[];
        uploader: string;
        start_time?: any;
        creator?: any;
        duration: number;
        vcodec: string;
        alt_title?: any;
        id: string;
        vbr?: any;
        webpage_url: string;
        dislike_count: number;
        description: string;
        channel_url: string;
        album?: any;
        extractor_key: string;
        subtitles: Subtitles;
        automatic_captions: AutomaticCaptions;
        extractor: string;
        title: string;
        height: number;
    }
 }

