import {AnalyticsClient, IAnalyticsTrackingData, IAnalyticsData, TrackingData} from "./Base";
import {isFunction} from "lodash";

export class FPTrackingData extends TrackingData {
    readonly type : string;

    constructor(shouldTrack: boolean, type: string) {
        super(shouldTrack);
        this.type = type;
    }
}

const w: any = (<any>window);

export class FacebookPixelClient extends AnalyticsClient {

    private readonly _shouldTrack : boolean;
    private readonly _trackingCode : string;

    constructor(params : {shouldTrack: boolean, trackingCode: string}) {
        super();
        this._shouldTrack = params.shouldTrack;
        this._trackingCode = params.trackingCode;
    }

    initialize(): void {
        if(this._shouldTrack && typeof w !== 'undefined' && w.document) {
            if(!isFunction((<any>window).fbq)) {
                !function (f:any, b:any, e:any, v:any, n:any, t:any, s:any) {
                    if (f.fbq)return;
                    n = f.fbq = function () {
                        n.callMethod ?
                            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                    };
                    if (!f._fbq) f._fbq = n;
                    n.push = n;
                    n.loaded = !0;
                    n.version = '2.0';
                    n.queue = [];
                    t = b.createElement(e);
                    t.async = !0;
                    t.src = v;
                    s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s)
                }(w,
                    w.document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', null, null, null);
            }

            w.fbq('init', this._trackingCode);

        } else {
            console.log(`facebookPixel init simulated for ${this._trackingCode}`)
        }
    }

    send(data: IAnalyticsTrackingData): void {
        const facebookData = data as FPTrackingData;

        if(!facebookData) {
            throw new Error("Not correct data");
        }

        if (facebookData.shouldTrack) {
            w.fbq('track', facebookData.type);
        } else {
            console.log(`facebookPixel send ${facebookData.type} simulated for ${this._trackingCode}`)
        }
    }
}
