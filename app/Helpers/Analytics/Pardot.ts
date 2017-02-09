import {AnalyticsClient, IAnalyticsTrackingData,  TrackingData} from "./Base";
import {isFunction} from "lodash";

const w: any = (<any>window);

const callPiTracker = (url) => {
    if(typeof window !== 'undefined' && window.document) {
        if (isFunction(w.piTracker)) {
            w.piTracker(url);
        } else {
            setTimeout(callPiTracker, 1000, url);
        }
    }
};

export class PardotTrackingData extends TrackingData {

    readonly shouldTrack: boolean;
    readonly url : string;

    constructor(shouldTrack: boolean, url: string) {
        super(shouldTrack);
        this.url = url;
    }
}

export class PardotClient extends AnalyticsClient {

    private readonly _shouldTrack : boolean;
    private readonly _piAId : string;
    private readonly _piCId : string;

    constructor(params : {shouldTrack: boolean, piAId: string, piCId: string}) {
        super();
        this._shouldTrack = params.shouldTrack;
        this._piAId = params.piAId;
        this._piCId = params.piCId;
    }

    initialize(): void {
        if (this._shouldTrack && typeof w !== 'undefined' && w.document) {
            if(!isFunction(w.piTracker)) {
                w.piAId = this._piAId;
                w.piCId = this._piCId;
                (function () {
                    function async_load() {
                        var s = document.createElement('script');
                        s.type = 'text/javascript';
                        s.src = ('https:' == document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js';
                        var c = document.getElementsByTagName('script')[0];
                        c.parentNode.insertBefore(s, c);
                    }

                    if (w.attachEvent) {
                        w.attachEvent('onload', async_load);
                    }
                    else {
                        w.addEventListener('load', async_load, false);
                    }
                })();
            }

        }
    }

    send(data: IAnalyticsTrackingData): void {
        const pardotData = data as PardotTrackingData;
        if(!pardotData) {
            throw new Error("Not correct data");
        }
        if (pardotData.shouldTrack) {
            callPiTracker(pardotData.url);
        } else {
            console.log(`facebookPixel send ${pardotData.url} simulated for ${this._piAId}:${this._piCId}`)
        }
    }
}
