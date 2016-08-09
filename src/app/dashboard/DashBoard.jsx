import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Col from "react-bootstrap/lib/Col";
import Panel from "react-bootstrap/lib/Panel";
import ProgressBar from "react-bootstrap/lib/ProgressBar";
import Badge from "react-bootstrap/lib/Badge";
import Page from "app/workspace/Page";
import Metrics from "./metrics.json";

class DashBoard extends ShallowComponent {

    constructor(props) {
        super(props);

        this.state = {
            notFound: false,
            isLoading: true,
            jsonData: Metrics,
            logData: [],
            vmTotal: [],
            vmHeap: [],
            vmNonHeap: []
        };
    }

    render() {
        if (this.state.jsonData == undefined) {
            return (<span>Yükleniyor...</span>);
        }

        return (

            <Page header="Sistem Bilgileri" description="Sistemle ilgili Log detayları, bellek kullanım detayları, HTTP yanıt detayları ve servis detayları gösterilmektedir.">
                <br/>
                <Panel header="Log Detayları">
                    <Col xs={12} md={12}>
                        <Col componentClass="label">Debug <Badge>{this.state.logData.debugCount}</Badge></Col>
                        <ProgressBar striped bsStyle="success" now={this.state.logData.debug}/>
                        <Col componentClass="label">Info <Badge>{this.state.logData.infoCount}</Badge></Col>
                        <ProgressBar striped bsStyle="info" now={this.state.logData.info}/>
                        <Col componentClass="label">Warn <Badge>{this.state.logData.warnCount}</Badge></Col>
                        <ProgressBar striped bsStyle="warning" now={this.state.logData.warn}/>
                        <Col componentClass="label">Error <Badge>{this.state.logData.errorCount}</Badge></Col>
                        <ProgressBar striped bsStyle="danger" now={this.state.logData.error}/>
                    </Col>
                </Panel>

                <Panel header="VM Detayları">
                    <Col xs={12} md={4}>
                        <Panel header="Total (MB)">
                            <Col componentClass="label">Used <Badge>{this.state.vmTotal.totalDataCount}</Badge>
                            </Col>
                            <ProgressBar striped bsStyle="danger" now={this.state.vmTotal.totalData}/>
                            <Col componentClass="label">Free
                                <Badge>{this.state.vmTotal.unusedTotalCount}</Badge></Col>
                            <ProgressBar striped bsStyle="success" now={this.state.vmTotal.unusedTotal}/>
                        </Panel>
                    </Col>
                    <Col xs={12} md={4}>
                        <Panel header="Heap (MB)">
                            <Col componentClass="label">Used <Badge>{this.state.vmHeap.usedHeapCount}</Badge></Col>
                            <ProgressBar striped bsStyle="danger" now={this.state.vmHeap.usedHeap}/>
                            <Col componentClass="label">Free <Badge>{this.state.vmHeap.unusedHeapCount}</Badge></Col>
                            <ProgressBar striped bsStyle="success" now={this.state.vmHeap.unusedHeap}/>
                        </Panel>
                    </Col>
                    <Col xs={12} md={4}>
                        <Panel header="Non-Heap (MB)">
                            <Col componentClass="label">Used <Badge>{this.state.vmNonHeap.usedCount}</Badge></Col>
                            <ProgressBar striped bsStyle="danger" now={this.state.vmNonHeap.used}/>
                            <Col componentClass="label">Free <Badge>{this.state.vmNonHeap.freeCount}</Badge></Col>
                            <ProgressBar striped bsStyle="success" now={this.state.vmNonHeap.free}/>
                        </Panel>
                    </Col>
                    <Col xs={12} md={6}>
                        <Panel header="Pool Status (%)">
                            <Col componentClass="label">Eden <Badge>{this.__poolData("PS-Eden-Space")}</Badge></Col>
                            <ProgressBar striped bsStyle="danger" now={this.__poolData("PS-Eden-Space")}
                                         label="%(percent)s%"/>
                            <Col componentClass="label">Old <Badge>{this.__poolData("PS-Old-Gen")}</Badge></Col>
                            <ProgressBar striped bsStyle="danger" now={this.__poolData("PS-Old-Gen")}
                                         label="%(percent)s%"/>
                            <Col componentClass="label">Perm <Badge>{this.__poolData("PS-Perm-Gen")}</Badge></Col>
                            <ProgressBar striped bsStyle="danger" now={this.__poolData("PS-Perm-Gen")}/>
                            <Col componentClass="label">Survior <Badge>{this.__poolData("PS-Survivor-Space")}</Badge></Col>
                            <ProgressBar striped bsStyle="danger" now={this.__poolData("PS-Survivor-Space")}
                                         label="%(percent)s%"/>
                        </Panel>
                    </Col>
                    <Col xs={12} md={6}>
                        <Panel header="Threads (count)">
                            <Col >Runnable <Col className="pull-right">
                                <Badge>{this.__jvm("runnable")}</Badge></Col></Col><p/>
                            <Col >New <Col className="pull-right"><Badge>{this.__jvm("new")}</Badge></Col></Col><p/>
                            <Col >Timed-W <Col
                                className="pull-right"><Badge>{this.__jvm("timed")}</Badge></Col></Col>
                            <p/>
                            <Col >Waiting <Col
                                className="pull-right"><Badge>{this.__jvm("waiting")}</Badge></Col></Col>
                            <p/>
                            <Col >Blocked <Col
                                className="pull-right"><Badge>{this.__jvm("blocked")}</Badge></Col></Col>
                            <p/>
                            <Col >Terminated <Col
                                className="pull-right"><Badge>{this.__jvm("terminated")}</Badge></Col></Col>
                            <p/>
                        </Panel>
                    </Col>
                </Panel>
                <Panel header="HTTP Yanıt Detayları">
                    <Col xs={12} md={12}>
                        <Panel header="Toplam">
                            <Col xs={12} md={3} componentClass="label">2xx
                                <Badge>{this.__totalRequests("2xx")}</Badge>
                                <ProgressBar striped bsStyle="success" now={this.__totalRequests("2xx")}/></Col>
                            <Col xs={12} md={3} componentClass="label">3xx
                                <Badge>{this.__totalRequests("3xx")}</Badge>
                                <ProgressBar striped bsStyle="info" now={this.__totalRequests("3xx")}/></Col>
                            <Col xs={12} md={3} componentClass="label">4xx
                                <Badge>{this.__totalRequests("4xx")}</Badge>
                                <ProgressBar striped bsStyle="warning" now={this.__totalRequests("4xx")}/></Col>
                            <Col xs={12} md={3} componentClass="label">5xx
                                <Badge>{this.__totalRequests("5xx")}</Badge>
                                <ProgressBar striped bsStyle="danger" now={this.__totalRequests("5xx")}/></Col>
                        </Panel>
                    </Col>
                    <Col xs={12} md={4}>
                        <Panel header="2xx-response (events/second)">
                            <Col >1 min <Col
                                className="pull-right"><Badge>{this.__httpResponse("2xx", "m1")}</Badge></Col></Col><p/>
                            <Col >5 min <Col
                                className="pull-right"><Badge>{this.__httpResponse("2xx", "m5")}</Badge></Col></Col><p/>
                            <Col >15 min <Col
                                className="pull-right"><Badge>{this.__httpResponse("2xx", "m15")}</Badge></Col></Col>
                            <p/>
                            <Col >Mean <Col
                                className="pull-right"><Badge>{this.__httpResponse("2xx", "mean")}</Badge></Col></Col>
                            <p/>
                        </Panel>
                    </Col>
                    <Col xs={12} md={4}>
                        <Panel header="4xx-response (events/second)">
                            <Col >1 min <Col
                                className="pull-right"><Badge>{this.__httpResponse("4xx", "m1")}</Badge></Col></Col><p/>
                            <Col >5 min <Col
                                className="pull-right"><Badge>{this.__httpResponse("4xx", "m5")}</Badge></Col></Col><p/>
                            <Col >15 min <Col
                                className="pull-right"><Badge>{this.__httpResponse("4xx", "m15")}</Badge></Col></Col>
                            <p/>
                            <Col >Mean <Col
                                className="pull-right"><Badge>{this.__httpResponse("4xx", "mean")}</Badge></Col></Col>
                            <p/>
                        </Panel>
                    </Col>
                    <Col xs={12} md={4}>
                        <Panel header="5xx-response (events/second)">
                            <Col >1 min <Col
                                className="pull-right"><Badge>{this.__httpResponse("5xx", "m1")}</Badge></Col></Col><p/>
                            <Col >5 min <Col
                                className="pull-right"><Badge>{this.__httpResponse("5xx", "m5")}</Badge></Col></Col><p/>
                            <Col >15 min<Col
                                className="pull-right"><Badge>{this.__httpResponse("5xx", "m15")}</Badge></Col></Col>
                            <p/>
                            <Col >Mean <Col
                                className="pull-right"><Badge>{this.__httpResponse("5xx", "mean")}</Badge></Col></Col>
                            <p/>
                        </Panel>
                    </Col>
                </Panel>
                <Panel header="Servis Detayları">
                    <Col xs={12} md={4}>
                        <Panel header="AuthResource.login (Sec)">
                            <Col >Max <Col
                                className="pull-right"><Badge>{this.__serviceList("login", "max")}</Badge></Col></Col>
                            <p/>
                            <Col >Min <Col
                                className="pull-right"><Badge>{this.__serviceList("login", "min")}</Badge></Col></Col>
                            <p/>
                            <Col >Mean<Col className="pull-right">
                                <Badge>{this.__serviceList("login", "mean")}</Badge></Col></Col><p/>
                        </Panel>
                    </Col>
                    <Col xs={12} md={4}>
                        <Panel header="AuthResource.logout (Sec)">
                            <Col >Max <Col
                                className="pull-right"><Badge>{this.__serviceList("logout", "max")}</Badge></Col></Col>
                            <p/>
                            <Col >Min <Col
                                className="pull-right"><Badge>{this.__serviceList("logout", "min")}</Badge></Col></Col>
                            <p/>
                            <Col >Mean<Col className="pull-right">
                                <Badge>{this.__serviceList("logout", "mean")}</Badge></Col></Col><p/>
                        </Panel>
                    </Col>
                </Panel>
            </Page>

        );
    }

    __appenderData = ()=> {
        var debug = parseFloat(this.state.jsonData["meters"]["ch.qos.logback.core.Appender.debug"]["count"].toFixed(4));
        var info = parseFloat(this.state.jsonData["meters"]["ch.qos.logback.core.Appender.info"]["count"].toFixed(4));
        var warn = parseFloat(this.state.jsonData["meters"]["ch.qos.logback.core.Appender.warn"]["count"].toFixed(4));
        var error = parseFloat(this.state.jsonData["meters"]["ch.qos.logback.core.Appender.error"]["count"].toFixed(4));

        var all = debug + info + warn + error;

        var d = 100 * debug / all;
        var i = 100 * info / all;
        var w = 100 * warn / all;
        var e = 100 * error / all;
        var dc = debug + " / " + all;
        var ic = info + " / " + all;
        var wc = warn + " / " + all;
        var ec = error + " / " + all;

        var log = {
            debug: d,
            info: i,
            warn: w,
            error: e,
            debugCount: dc,
            infoCount: ic,
            warnCount: wc,
            errorCount: ec
        };
        this.setState({logData: log});
    };

    __vmTotal = ()=> {
        var all = parseInt(this.state.jsonData["gauges"]["jvm.memory.total.max"]["value"] / (1024 * 1024));
        var totalData = parseInt(this.state.jsonData["gauges"]["jvm.memory.total.used"]["value"] / (1024 * 1024));

        var unusedTotal = all - totalData;

        all = parseFloat(all.toFixed(4));
        totalData = parseFloat(totalData.toFixed(4));
        unusedTotal = parseFloat(unusedTotal.toFixed(4));

        var u = 100 * totalData / all;
        var f = 100 * unusedTotal / all;
        var uc = totalData + " MB" + " / " + all + " MB";
        var fc = unusedTotal + " MB" + " / " + all + " MB";

        var total = {
            totalData: u,
            unusedTotal: f,
            totalDataCount: uc,
            unusedTotalCount: fc
        };
        this.setState({vmTotal: total});
    };

    __vmHeap = ()=> {
        var all = parseInt(this.state.jsonData["gauges"]["jvm.memory.heap.max"]["value"] / (1024 * 1024));
        var usedHeap = parseInt(this.state.jsonData["gauges"]["jvm.memory.heap.used"]["value"] / (1024 * 1024));

        var unusedHeap = all - usedHeap;

        all = parseFloat(all.toFixed(4));
        usedHeap = parseFloat(usedHeap.toFixed(4));
        unusedHeap = parseFloat(unusedHeap.toFixed(4));

        var u = 100 * usedHeap / all;
        var f = 100 * unusedHeap / all;
        var uc = usedHeap + " MB" + " / " + all + " MB";
        var fc = unusedHeap + " MB" + " / " + all + " MB";

        var heap = {
            usedHeap: u,
            unusedHeap: f,
            usedHeapCount: uc,
            unusedHeapCount: fc
        };
        this.setState({vmHeap: heap});
    };

    __vmNonHeap = ()=> {

        var max = parseInt(this.state.jsonData["gauges"]["jvm.memory.non-heap.max"]["value"] / (1024 * 1024));
        var used = parseInt(this.state.jsonData["gauges"]["jvm.memory.non-heap.used"]["value"] / (1024 * 1024));

        if (max < 0) {
            max = used;
        }
        var free = max - used;

        max = parseFloat(max.toFixed(4));
        used = parseFloat(used.toFixed(4));
        free = parseFloat(free.toFixed(4));

        var u = 100 * used / max;
        var f = 100 * free / max;
        var uc = used + " MB" + " / " + max + " MB";
        var fc = free + " MB" + " / " + max + " MB";

        var nonHeap = {
            used: u,
            free: f,
            usedCount: uc,
            freeCount: fc
        };
        this.setState({vmNonHeap: nonHeap});
    };

    __poolData = (pool)=> {
        try {
            return parseFloat((this.state.jsonData["gauges"]["jvm.memory.pools." + pool + ".usage"]["value"]).toFixed(4));
        } catch (e) {
            return 0;
        }
    };

    __jvm = (jjvm)=> {
        try {
            return parseFloat((this.state.jsonData["gauges"]["jvm.threads." + jjvm + ".count"]["value"]).toFixed(4));
        } catch (e) {
            return 0;
        }
    };

    __serviceList = (state, value)=> {
        try {
            return parseFloat((this.state.jsonData["timers"]["io.robe.admin.resources.AuthResource." + state][value]).toFixed(4));
        } catch (e) {
            return 0;
        }
    };

    __totalRequests = (type)=> {
        try {
            return parseFloat((this.state.jsonData["meters"]["io.dropwizard.jetty.MutableServletContextHandler." + type + "-responses"]["count"]).toFixed(4));
        } catch (e) {
            return 0;
        }
    };


    __httpResponse = (type, key)=> {
        try {
            key = key + "_rate";
            return parseFloat((this.state.jsonData["meters"]["io.dropwizard.jetty.MutableServletContextHandler." + type + "-responses"][key]).toFixed(4));

        } catch (e) {
            return 0;
        }
    };

    componentDidMount = ()=> {
        this.__vmNonHeap();
        this.__appenderData();
        this.__vmTotal();
        this.__vmHeap();
    };

}

module.exports = DashBoard;