import {GATrackingData, GoogleAnalyticsClient} from "../GoogleAnalytics";
import {AnalyticsType} from "../AnalyticsType";
import {FPTrackingData} from "../FacebookPixel";

describe('GATrackingData', () => {
    describe('GetTrackingData', () => {
        it('should return self regardless of the key', () => {
            const d = new GATrackingData(true, "hello", "hello");
            expect(d.getTrackingData(AnalyticsType.GoogleAnalytics)).toBeInstanceOf(GATrackingData);
        });
        it('should return self when key is google analytics', () => {
            const d = new GATrackingData(true, "hello", "hello");
            expect(d.getTrackingData(AnalyticsType.GoogleAnalytics)).toBeInstanceOf(GATrackingData);
        });
    })
});

describe('GoogleAnalyticsClient', () => {
    describe('initialize', () => {
        it('should not initialize in testing mode', () => {
            const client = new GoogleAnalyticsClient({shouldTrack: false, trackingCode: "test", namespace: "testspace"});
            client.initialize();
            expect(window.ga).not.toBeDefined();
        });

        it('should execute ga if ga is already initialized', () => {

            var _action, _param1, _param2;

            window.ga = (action: string, param1:string, param2:string, param3: string) => {
                _action = action;
                _param1 = param1;
                _param2 = param3;
            };

            const client = new GoogleAnalyticsClient({shouldTrack: true, trackingCode: "test", namespace: "testspace"});
            client.initialize();
            expect(_action).toBe('create');
            expect(_param1).toBe('test');
            expect(_param2).toBe('testspace');
        });
    });

    describe('send', () => {
        it('should throw error if data is not googletracking data', () => {
            const client = new GoogleAnalyticsClient({shouldTrack: false, trackingCode: "test", namespace: "testspace"});
            const fb = new FPTrackingData(true, "drop");
            expect(() => { client.send(fb); }).toThrow();
        });

        it('should send ga tracking', () => {
            var _action, _param1, _param2;

            window.ga = (action: string, param1:string, param2:string) => {
                _action = action;
                _param1 = param1;
                _param2 = param2;
            };
            const client = new GoogleAnalyticsClient({shouldTrack: true, trackingCode: "test", namespace: "testspace"});
            const tracking = new GATrackingData(true, "gatype", 'gapage');
            client.send(tracking);
            expect(_action).toBe('testspace.send');
            expect(_param1).toBe('gatype');
            expect(_param2).toBe('gapage');
        });

    });

    describe('getClient', () => {
        it('should return self regardless of the key', () => {
            var _action, _param1, _param2;

            window.ga = (action: string, param1:string, param2:string) => {
                _action = action;
                _param1 = param1;
                _param2 = param2;
            };
            const client = new GoogleAnalyticsClient({shouldTrack: true, trackingCode: "test", namespace: "testspace"});
            expect(client.getClient(AnalyticsType.GoogleAnalytics)).toBeInstanceOf(GoogleAnalyticsClient);

        });
    });
});

