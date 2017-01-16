import React from "react";
import Card from "app/card/Card";
import ModalDataForm from "robe-react-ui/lib/form/ModalDataForm";
import DataGrid from "robe-react-ui/lib/datagrid/DataGrid";
import RemoteEndPoint from "robe-react-commons/lib/endpoint/RemoteEndPoint";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Store from "robe-react-commons/lib/stores/Store";
import QuartzModel from "./QuartzModel.json";
import TriggerModel from "./TriggerModel.json";
import ControlBar from "./ControlBar";

export default class QuartzJob extends ShallowComponent {
    static idField = "oid";

    constructor(props: Object) {
        super(props);

        this.state = {
            jobStore: new Store({
                endPoint: new RemoteEndPoint({
                    url: "quartzjobs"
                }),
                idField: QuartzJob.idField,
                autoLoad: true,
                _offset: "offset"
            }),
            selection: undefined,
            item: {},
            showModal: false,
            triggersStore: new Store({
                endPoint: new RemoteEndPoint({
                    url: "quartzjobs/undefined/triggers"
                }),
                idField: QuartzJob.idField,
                autoLoad: true
            })
        };
    }

    render(): Object {
        return (
            <Card header="İş Zamanlama Yönetimi">
                <DataGrid
                    key="jobs"
                    fields={QuartzModel.fields}
                    store={this.state.jobStore}
                    ref={"quartzTable"}
                    pagination={{ emptyText: "No data.", pageSize: 50 }}
                    editable={false}
                    pageable={false}
                    onSelection={this.__onSelection}
                    cellRenderer={this.__jobCellRenderer}
                    />
                <DataGrid
                    key="triggers"
                    toolbar={[{ name: "create", text: "Ekle" }]}
                    fields={TriggerModel.fields}
                    store={this.state.triggersStore}
                    ref="triggerTable"
                    onNewClick={this.__add}
                    onEditClick={this.__edit}
                    onDeleteClick={this.__remove}
                    pageable={false}
                    editable={true}
                    searchable={false}
                    cellRenderer={this.__triggerCellRenderer}
                    />
                <ModalDataForm
                    ref="detailModal"
                    header="Trigger"
                    show={this.state.showModal}
                    onSubmit={this.__onSave}
                    onCancel={this.__onCancel}
                    defaulValues={this.state.item}
                    fields={TriggerModel.fields}
                    />
            </Card>
        );
    }
    __onSelection(item: Object) {
        if (item) {
            this.state.triggersStore.setReadUrl(`quartzjobs/${item.oid}/triggers`);
            this.setState({
                selection: item,
            });
            this.refs.triggerTable.__readData();
        }
    }

    __add() {
        let empty = {};
        this.__showModal(empty);
    }

    __edit() {
        let selectedRows = this.refs.triggerTable.getSelectedRows();
        if (!selectedRows || !selectedRows[0]) {
            return;
        }
        this.__showModal(selectedRows[0]);
    }

    __onCancel() {
        this.setState({ showModal: false });
    }

    __onSave(newData, callback) {
        newData.parentId = this.state.selection.id;

        this.triggersStore.create(newData, callback(true));
    }

    __remove() {
        let selectedRows = this.refs.triggerTable.getSelectedRows();
        this.triggersStore.delete(selectedRows[0]);
    }

    __showModal(newItem) {
        this.setState({ showModal: true, item: newItem });
    }

    __onJobStatusChange() {
        this.state.jobStore.read();
        this.state.triggersStore.read();
    }
    __onTriggerStatusChange() {
        this.state.jobStore.read();
        this.state.triggersStore.read();
    }

    __jobCellRenderer(idx: number, fields: Array, row: Object) {
        if (idx === 3) {
            return <td key={fields[idx].name}>{row[fields[idx].name]}<ControlBar servicePath="quartzjobs" item={row} onChange={this.__onJobStatusChange} /></td>;
        }
        if (fields[idx].visible !== false) {
            return <td key={fields[idx].name}>{row[fields[idx].name]}</td>;
        }
        return undefined;
    }
    __triggerCellRenderer(idx: number, fields: Array, row: Object) {
        if (idx === 6) {
            return <td key={fields[idx].name}>{row[fields[idx].name]}<ControlBar servicePath="triggers" item={row} onChange={this.__onTriggerStatusChange} /></td>;
        }
        if (fields[idx].visible !== false) {
            return <td key={fields[idx].name}>{row[fields[idx].name]}</td>;
        }
        return undefined;
    }
}
