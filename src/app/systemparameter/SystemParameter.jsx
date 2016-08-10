import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Page from "app/workspace/Page";
import SystemParameterModel from "./SystemParameterModel.json";
import ModalDataForm from "robe-react-ui/lib/form/ModalDataForm";
import DataGrid from "robe-react-ui/lib/datagrid/DataGrid";
import RemoteEndPoint from "robe-react-commons/lib/endpoint/RemoteEndPoint";
import Store from "robe-react-commons/lib/stores/Store";


export default class SystemParameter extends ShallowComponent {

    constructor(props: Object) {
        super(props);

        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: "http://localhost:3000/systemparameters"
            }),
            idField: "id",
            autoLoad: true,
            _offset: "offset"
        });

        this.state = {
            columns: SystemParameterModel.columns,
            store: store,
            showModal: false,
            item: {}
        };
    }

    render(): Object {
        return (
            <Page description={"description"} header={"System Parameter "}>
                <DataGrid
                    toolbar={["create", "edit"]}
                    columns={this.state.columns}
                    stores={[this.state.store]}
                    ref="table"
                    onNewClick={this.__add}
                    onEditClick={this.__edit}
                    onDeleteClick={this.__remove}
                    exportButton={true}
                    pageable={true}
                    editable={true}
                    pagination={{ pageSize: 50 }}
                />
                <ModalDataForm
                    ref="detailModal"
                    header="System Parameter"
                    show={this.state.showModal}
                    onSubmit={this.__onSave}
                    onCancel={this.__onCancel}
                    item={this.state.item}
                    fields={this.state.columns}
                />
            </Page>
        );
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

    __onSave = (newData, callback) => {
        this.state.store.create(newData, callback(true));
    };

    __remove = () => {
        let selectedRows = this.refs.table.getSelectedRows();
        console.log("removing ", selectedRows[0]);
    };

    __showModal = (newItem) => {
        this.setState({showModal: true, item: newItem});
    };
}
