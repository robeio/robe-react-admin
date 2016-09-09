import BaseCrudPage from "../common/BaseCrudPage";
import MailTemplateModel from "./MailTemplateModel.json";

export default class MailTemplate extends BaseCrudPage {
    constructor() {
        let state = {};
        state.url = "http://localhost:3000/mailtemplates";
        state.idField = "id";
        state.fields = MailTemplateModel.fields;
        state.description = "Description of MailTemplate";
        state.header = "Mail Template";
        super(state);
    }
}