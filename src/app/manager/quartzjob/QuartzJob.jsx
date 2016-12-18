import React from "react";
import Card from "libs/card/Card";
import ModalDataForm from "robe-react-ui/lib/form/ModalDataForm";
import DataGrid from "robe-react-ui/lib/datagrid/DataGrid";
import RemoteEndPoint from "robe-react-commons/lib/endpoint/RemoteEndPoint";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Store from "robe-react-commons/lib/stores/Store";
import QuartzModel from "./QuartzModel.json";
import TriggerModel from "./TriggerModel.json";

export default class QuartzJob extends ShallowComponent {


    static idField = "oid";
    triggersStore:undefined;

    constructor(props) {
        super(props);

        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: "quartzjobs"
            }),
            idField: QuartzJob.idField,
            autoLoad: true,
            _offset: "offset"
        });

        this.state = {
            store: store,
            selection: undefined,
            item: {},
            showModal: false
        };
    }

    render() {
        return (
            <Card header="İş Zamanlama Yönetimi">
                <DataGrid
                    fields={QuartzModel.fields}
                    store={this.state.store}
                    ref={"quartzTable"}
                    toolbar={[{name: "create", text: "Ekle"}, {name: "edit", text: "Düzenle"}, {name: "delete", text: "Sil"}]}
                    pagination={{ emptyText: "No data.", pageSize: 50 }}
                    editable={false}
                    pageable={false}
                />
                {this.renderTriggerGrid()}
            </Card>
        );
    }

    renderTriggerGrid() {
        if (!this.state.selection)
            return null;

        let url = `triggers?parentId="${this.state.selection.id}`;

        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: url
            }),
            idField: QuartzJob.idField,
            autoLoad: true
        });

        this.triggersStore = store;

        return ([
            <DataGrid
                toolbar={[{name: "create", text: "Ekle"}]}
                fields={TriggerModel.fields}
                store={store}
                ref="triggerTable"
                onNewClick={this.__add}
                onEditClick={this.__edit}
                onDeleteClick={this.__remove}
                onSelection={this.__onSelection}
                pageable={false}
                editable={true}
                searchable={false}
            />,
            <ModalDataForm
                ref="detailModal"
                header="Trigger"
                show={this.state.showModal}
                onSubmit={this.__onSave}
                onCancel={this.__onCancel}
                defaulValues={this.state.item}
                fields={TriggerModel.fields}
            />]);
    }

    __onSelection(item) {
        if (item) {
            this.setState({selection: item});
        }
    };

    __add() {
        let empty = {};
        this.__showModal(empty);
    };

    __edit() {
        let selectedRows = this.refs.triggerTable.getSelectedRows();
        if (!selectedRows || !selectedRows[0]) {
            return;
        }
        this.__showModal(selectedRows[0]);
    };

    __onCancel() {
        this.setState({showModal: false});
    };

    __onSave(newData, callback) {
        newData.parentId = this.state.selection.id;

        this.triggersStore.create(newData, callback(true));
    };

    __remove() {
        let selectedRows = this.refs.triggerTable.getSelectedRows();
        this.triggersStore.delete(selectedRows[0]);
    };

    __showModal(newItem) {
        this.setState({showModal: true, item: newItem});
    };
}
