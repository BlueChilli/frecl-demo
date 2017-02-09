
import {AnalyticsType} from "./AnalyticsType";
export interface IAnalyticsData {
    readonly shouldTrack : boolean;
}

export interface IAnalyticsTrackingData extends IAnalyticsData
{
    getTrackingData(key:AnalyticsType) : IAnalyticsTrackingData;
}

export interface IDictionary<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): T[];
    clear(): void;
}

export class Dictionary<T> implements IDictionary<T> {
    _keys: string[] = [];
    _values: T[] = [];

    constructor(init: { key: string; value: T; }[]) {

        for (var x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }

    add(key: string, value: T) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: string) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    keys(): string[] {
        return this._keys;
    }

    values(): T[] {
        return this._values;
    }

    containsKey(key: string) {
        if (typeof this[key] === "undefined") {
            return false;
        }

        return true;
    }

    clear() : void {
        this._keys = [];
        this._values = [];
    }
}

class AnalyticDataProxy extends Dictionary<IAnalyticsTrackingData>
implements IAnalyticsTrackingData {

    public getTrackingData(key: AnalyticsType): IAnalyticsTrackingData {
        return this[AnalyticsType[key]];
    }
    shouldTrack: boolean = true;
}

export class TrackingData implements IAnalyticsTrackingData
{
    getTrackingData(key: AnalyticsType): IAnalyticsTrackingData {
        return this;
    }

    shouldTrack: boolean;
    constructor(shouldTrack:boolean) {
        this.shouldTrack = shouldTrack;
    }
}


class AnalyticsDataBuilder {

    static builder() : AnalyticsDataBuilder {
        return new AnalyticsDataBuilder();
    }

    private readonly _store : AnalyticDataProxy;

    constructor() {
        this._store = new AnalyticDataProxy([]);
    }

    public addTrackingData(key: AnalyticsType, factory: () => IAnalyticsTrackingData) : AnalyticsDataBuilder {
        this._store.add(AnalyticsType[key], factory());
        return this;
    }

    public removeTrackingData(key: AnalyticsType) : AnalyticsDataBuilder {
        this._store.remove(AnalyticsType[key]);
        return this;
    }

    public build() : IAnalyticsTrackingData {
        var result = new AnalyticDataProxy([])
        const keys = this._store.keys();
        keys.forEach(key => {
            result.add(key, this._store[key]);
        });
        return result;
    }
}


class AnalyticsBuilder {
    private _store : any = {}


    static builder() : AnalyticsBuilder {
        return new AnalyticsBuilder();
    }

    public configureClient(key: AnalyticsType, factory: () => IAnalytics) : AnalyticsBuilder {
        this._store[AnalyticsType[key]] = factory;
        return this;
    }

    public build() : IAnalytics {
        const keys = Object.keys(this._store);
        let proxy = new AnalyticsProxy();
        keys.forEach(key => {
            proxy.addClient(key, this._store[key]);
        });

        return proxy;
    }
}


export interface IAnalytics
{
    getClient(key:AnalyticsType) : IAnalytics;
    send(data: IAnalyticsTrackingData) : void;
}

class AnalyticsProxy implements IAnalytics {
    public getClient(key: AnalyticsType): IAnalytics {
        const id : string = AnalyticsType[key];
        if(!this.hasClientInitalized(id)) {
            const clientFactory = this._clients[id];
            if(clientFactory) {
                return clientFactory();
            }

            return null;
        }
        else {
            return this.getClientFromCache(id);
        }
    }

    private _clients : any = {}
    private _clientCache: any = {}


    public addClient(key: string, factory : () => IAnalytics) : void {
        this._clients[key] = factory;
    }

    public send(data: IAnalyticsTrackingData) : void {
        const keys = Object.keys(this._clients);
        keys.forEach(key => {
            const clientFactory = this._clients[key];
            const params = data.getTrackingData(AnalyticsType[key]);
            if(typeof params !== 'undefined') {
                let client : IAnalytics;
                if(!this.hasClientInitalized(key)) {
                    client = clientFactory();
                    this.setClientFromCache(key, client);
                }
                else {
                    client = this.getClientFromCache(key);
                }
                client.send(params);
            }
        });
    }

    private hasClientInitalized(key : string) : boolean {
        return typeof(this._clientCache[key]) !== "undefined";
    }

    private getClientFromCache(key : string) : IAnalytics {
        return this._clientCache[key] as IAnalytics;
    }

    private setClientFromCache(key : string, client : IAnalytics) : void {
        this._clientCache[key] = client;
    }
}

export abstract class AnalyticsClient implements IAnalytics {

    abstract send(data: IAnalyticsTrackingData): void;
    abstract initialize(): void;
    getClient(key: AnalyticsType): IAnalytics {
       return this;
    }
}

export const configureAnalyticsData = (configure: (builder: AnalyticsDataBuilder) => IAnalyticsTrackingData) : IAnalyticsTrackingData => {
    return configure(AnalyticsDataBuilder.builder());
};

export const configureAnalytics = (configure: (builder: AnalyticsBuilder) => IAnalytics) : IAnalytics => {
    return configure(AnalyticsBuilder.builder());
};

