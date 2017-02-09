import {configureAnalytics, configureAnalyticsData, IAnalytics, IAnalyticsTrackingData} from '../Base';
import {AnalyticsType} from '../AnalyticsType';
import {GoogleAnalyticsClient} from "../GoogleAnalytics";



describe('build', () => {
    it('should return client', () => {

        let _numberOfExecuted = 0;

        const data = configureAnalyticsData(builder => {
               return builder
                   .addTrackingData(AnalyticsType.GoogleAnalytics, () => {
                       return <IAnalyticsTrackingData> { shouldTrack: true};
                   })
                   .build();
            });


        const client = configureAnalytics(builder => {

            return builder
                .configureClient(AnalyticsType.GoogleAnalytics, () => {
                    _numberOfExecuted++;
                    return <IAnalytics> {
                        send: (data:IAnalyticsTrackingData) => {

                        }
                    };
                }).build()
        });

        client.send(data);

        expect(_numberOfExecuted).toBe(1);
    });

    it('calling send should only initialize client once if not initialized', () => {

        let _numberOfExecuted = 0;

        const data = configureAnalyticsData(builder => {

            return builder
                .addTrackingData(AnalyticsType.GoogleAnalytics, () => {
                    return <IAnalyticsTrackingData> { shouldTrack: true};
                })
                .build();
        });

        const client = configureAnalytics(builder => {
            return builder
                .configureClient(AnalyticsType.GoogleAnalytics, () => {
                    _numberOfExecuted++;
                    return <IAnalytics> {
                        send: (data:IAnalyticsTrackingData) => {

                        }
                    };
                }).build();
        });

        client.send(data);
        client.send(data);

        expect(_numberOfExecuted).toBe(1);
    });

    it('should call multiple clients if configured and data are configured', () => {

        let _numberOfExecuted = 0;

        const data = configureAnalyticsData(builder => {

            return builder
                    .addTrackingData(AnalyticsType.GoogleAnalytics, () => {
                        return <IAnalyticsTrackingData> { shouldTrack: true};
                    })
                    .addTrackingData(AnalyticsType.FacebookPixel, () => {
                        return <IAnalyticsTrackingData> { shouldTrack: true};
                    })
                    .build()
        });

        const client = configureAnalytics(builder => {

            return builder
                .configureClient(AnalyticsType.GoogleAnalytics, () => {
                    return <IAnalytics> {
                        send: (data:IAnalyticsTrackingData) => {
                            _numberOfExecuted++;
                        }
                    };
                })
                .configureClient(AnalyticsType.FacebookPixel, () => {
                    return <IAnalytics> {
                        send: (data:IAnalyticsTrackingData) => {
                            _numberOfExecuted++;
                        }
                    };
                })
                .build();

        });


        client.send(data);

        expect(_numberOfExecuted).toBe(2);
    });

    it('should not call send if data is not configured but client is configured', () => {

        let _numberOfExecuted = 0;

        const data = configureAnalyticsData(builder => {
           return builder
               .addTrackingData(AnalyticsType.GoogleAnalytics, () => {
                   return <IAnalyticsTrackingData> { shouldTrack: true};
               })
               .build();
        });


        const client = configureAnalytics(builder => {
           return builder
               .configureClient(AnalyticsType.GoogleAnalytics, () => {
                   return <IAnalytics> {
                       send: (data:IAnalyticsTrackingData) => {
                           _numberOfExecuted++;
                       }
                   };
               })
               .configureClient(AnalyticsType.FacebookPixel, () => {
                   return <IAnalytics> {
                       send: (data:IAnalyticsTrackingData) => {
                           _numberOfExecuted++;
                       }
                   };
               })
               .build();

        });

        client.send(data);

        expect(_numberOfExecuted).toBe(1);
    });

    it('configuring same client twice should only call the latest one', () => {

         let _isFirstOneCalled : boolean = false;
         let  _isSecondOnecalled: boolean = false;

        const data = configureAnalyticsData(builder => {
            return builder
                .addTrackingData(AnalyticsType.GoogleAnalytics, () => {
                    return <IAnalyticsTrackingData> { shouldTrack: true};
                })
                .build();
        });


        const client = configureAnalytics(builder => {
            return builder
                .configureClient(AnalyticsType.GoogleAnalytics, () => {
                    return <IAnalytics> {
                        send: (data:IAnalyticsTrackingData) => {
                            _isFirstOneCalled = true;
                        }
                    };
                })
                .configureClient(AnalyticsType.FacebookPixel, () => {
                    return <IAnalytics> {
                        send: (data:IAnalyticsTrackingData) => {

                        }
                    };
                })
                .configureClient(AnalyticsType.GoogleAnalytics, () => {
                    return <IAnalytics> {
                        send: (data:IAnalyticsTrackingData) => {
                            _isSecondOnecalled = true;
                        }
                    };
                })
                .build();

        });

        client.send(data);

        expect(_isFirstOneCalled).toBeFalsy();
        expect(_isSecondOnecalled).toBeTruthy();
    });
});


describe('getClient', () => {
    it('should return null client if client is not configured for given key', () => {
        var _action, _param1, _param2;


        const data = configureAnalyticsData(builder => {
            return builder
                .addTrackingData(AnalyticsType.GoogleAnalytics, () => {
                    return <IAnalyticsTrackingData> { shouldTrack: true};
                })
                .build();
        });


        const client = configureAnalytics(builder => {
            return builder
                .configureClient(AnalyticsType.GoogleAnalytics, () => {
                    return new GoogleAnalyticsClient({shouldTrack: true, trackingCode: "test", namespace: "test"});
                })
                .build();

        });

        expect(client.getClient(AnalyticsType.FacebookPixel)).toBeNull();

    });

    it('should return correct client given the key', () => {
        var _action, _param1, _param2;


        const data = configureAnalyticsData(builder => {
            return builder
                .addTrackingData(AnalyticsType.GoogleAnalytics, () => {
                    return <IAnalyticsTrackingData> { shouldTrack: true};
                })
                .build();
        });


        const client = configureAnalytics(builder => {
            return builder
                .configureClient(AnalyticsType.GoogleAnalytics, () => {
                    return new GoogleAnalyticsClient({shouldTrack: true, trackingCode: "test", namespace: "test"});
                })
                .configureClient(AnalyticsType.FacebookPixel, () => {
                    return <IAnalytics> {
                        send: (data:IAnalyticsTrackingData) => {

                        }
                    };
                })
                .build();

        });

        expect(client.getClient(AnalyticsType.GoogleAnalytics)).toBeInstanceOf(GoogleAnalyticsClient);

    });
});

