"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = __importDefault(require("../auth/index"));
function default_1(injectedStore, injectedCache) {
    let cache = injectedCache;
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    if (!cache) {
        cache = require('../../../store/dummy');
    }
    let table = 'users';
    let procedence = '[USER CONTROLLER]';
    function createUser({ datas, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (!datas.first_name || !datas.last_name || !datas.email || !datas.password) {
                    reject('Incorrect dates, fill all fields!!!');
                    return false;
                }
                const body = {
                    data: { first_name: datas.first_name,
                        last_name: datas.last_name ? datas.last_name : null,
                        phone_number: datas.phone_number ? datas.phone_number : null,
                        email: datas.email,
                        dateBirthday: datas.dateBirthday ? datas.dateBirthday : null,
                        full_name: `${datas.first_name}` + " " + `${datas.last_name}`,
                        provider: 'gmail',
                    },
                    type: type
                };
                const registerRespon = yield store.upsert(table, body);
                const responAuth = yield index_1.default.upsert(registerRespon, {
                    encrypted_password: yield bcrypt_1.default.hash(datas.password, 5),
                    id: registerRespon.id,
                    email: registerRespon.email
                });
                console.log(registerRespon, responAuth);
                const { email } = Object.assign(registerRespon, responAuth);
                console.log('email controller Auth-->', email);
                const response = yield index_1.default.insert(email, datas.password);
                resolve(response);
            }));
        });
    }
}
exports.default = default_1;
return {
    createUser
};
//# sourceMappingURL=controller.js.map