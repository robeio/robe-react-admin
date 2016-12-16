import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Card from "libs/card/Card";
import ModalDataForm from "robe-react-ui/lib/form/ModalDataForm";
import DataGrid from "robe-react-ui/lib/datagrid/DataGrid";
import RemoteEndPoint from "robe-react-commons/lib/endpoint/RemoteEndPoint";
import Store from "robe-react-commons/lib/stores/Store";
import QuartzModel from "./QuartzModel.json";
import TriggerModel from "./TriggerModel.json";// eslint-disable-line import/no-unresolved

export default class SystemParameter extends ShallowComponent {


    triggersStore:undefined;

    constructor(props:Object) {
        super(props);

        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: "http://localhost:3000/quartzjobs"
            }),
            idField: "id",
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

    render():Object {
        return (
            <Card description={"Select job for see triggers of job"} header={"QuartzJob Management "}>
                <DataGrid
                    fields={QuartzModel.fields}
                    store={this.state.store}
                    ref={"table"}
                    toolbar={["create", "edit", "delete"]}
                    pageable={false}
                    pagination={{ emptyText: "No data.", pageSize: 50 }}
                    editable={false}
                />
                {this.renderTriggerGrid()}
            </Card>
        );
    }

    renderTriggerGrid():Object {
        if (this.state.selection) {
            let url = `http://localhost:3000/triggers?parentId="${this.state.selection.id}`;

            let store = new Store({
                endPoint: new RemoteEndPoint({
                    url: url,
                }),
                idField: "id",
                autoLoad: true
            });

            this.triggersStore = store;
            return ([
                <DataGrid
                    toolbar={["create"]}
                    fields={TriggerModel.fields}
                    store={store}
                    ref="table"
                    onNewClick={this.__add}
                    onEditClick={this.__edit}
                    onDeleteClick={this.__remove}
                    exportButton={true}
                    pageable={false}
                    onSelection={this.onSelection}
                    editable={true}
                    searchable={false}
                />,
                <ModalDataForm
                    ref="detailModal"
                    header="Trigger"
                    show={this.state.showModal}
                    onSubmit={this.__onSave}
                    onCancel={this.__onCancel}
                    item={this.state.item}
                    fields={TriggerModel.fields}
                />]);
        }
        return null;
    }

    onSelection(item:Object):Object {
        if (item) {
            this.setState({selection: item});
        }
    }

    __add = () => {
        let empty = {};
        this.__showModal(empty);
    };

    __edit = () => {
        let selectedRows = this.refs.table.getSelectedRows();
        if (!selectedRows || !selectedRows[0]) {
            return;
        }
        this.__showModal(selectedRows[0]);
    };

    __onCancel = () => {
        this.setState({showModal: false});
    };

    __onSave = (newData:Object, callback:Object) => {
        newData.parentId = this.state.selection.id;

        this.triggersStore.create(newData, callback(true));
    };

    __remove = () => {
        let selectedRows = this.refs.table.getSelectedRows();
        this.triggersStore.delete(selectedRows[0]);
    };

    __showModal = (newItem:Object) => {
        this.setState({showModal: true, item: newItem});
    };
}