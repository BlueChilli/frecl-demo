import {AnalyticsClient, IAnalyticsTrackingData, TrackingData} from "./Base";
import {isFunction} from "lodash";

export class GATrackingData extends TrackingData {
    readonly type : string;
    readonly page : string;

    constructor(shouldTrack: boolean, type: string, page: string) {
        super(shouldTrack);
        this.type = type;
        this.page = page;
    }
}

const w: any = (<any>window);

export class GoogleAnalyticsClient extends AnalyticsClient {

    private readonly _shouldTrack : boolean;
    private readonly _namespace : string;
    private readonly _trackingCode : string;

    constructor(params: {shouldTrack: boolean, namespace: string, trackingCode: string}) {
        super();
        this._shouldTrack = params.shouldTrack;
        this._namespace = params.namespace;
        this._trackingCode = params.trackingCode;
    }

    initialize(): void {
        if (this._shouldTrack && typeof(w) !== 'undefined' && w.document) {
            if (!isFunction(w.ga)) {
                (function (window:any, document:any, script:any, url:any, r:any, tag:any, firstScriptTag:any) {
                    window['GoogleAnalyticsObject'] = r;
                    window[r] = window[r] || function () {
                            (window[r].q = window[r].q || []).push(arguments)
                        };
                    const d : any = new Date();
                    window[r].l = 1 * d;
                    tag = document.createElement(script),
                        firstScriptTag = document.getElementsByTagName(script)[0];
                    tag.async = 1;
                    tag.src = url;
                    if (firstScriptTag && firstScriptTag.parentNode) {
                        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                    }
                })(
                    w,
                    w.document,
                    'script',
                    '//www.google-analytics.com/analytics.js', null, null, null
                );
            }

            w.ga('create', this._trackingCode, 'auto', this._namespace);

        } else {
            console.log(`googleAnalytics init simulated on ${this._namespace} for ${this._trackingCode}`)
        }
    }

    send(data: IAnalyticsTrackingData): void {
        const googleData = data as GATrackingData;

        if(!(data instanceof GATrackingData)) {
            throw new Error("Not correct data");
        }

         if (googleData.shouldTrack) {
             w.ga(`${this._namespace}.send`, googleData.type, googleData.page);
            console.log(`executing ${this._namespace}.send`,  googleData.type, googleData.page)
        } else {
            console.log(`googleAnalytics send ${googleData.type} simulated on ${this._namespace} for ${this._trackingCode}`)
        }
    }
}
