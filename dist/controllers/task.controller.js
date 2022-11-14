var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { taskSchema } from "../schemas/task.schema.js";
import { createTask, getTaskById, updateStatus, deleteTask, tasksByUser } from "../repositores/task.repository.js";
import { getUserById } from "../repositores/user.repository.js";
import { STATUS_CODE } from "../enums/statusCode.js";
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newTask, validation, errors, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newTask = req.body;
                    validation = taskSchema.validate(newTask);
                    if (validation.error) {
                        errors = validation.error.details.map(function (detail) { return detail.message; });
                        return [2 /*return*/, res.status(STATUS_CODE.UNPROCESSABLE).send(errors)];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, createTask(newTask)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(STATUS_CODE.CREATED)];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.status(STATUS_CODE.SERVER_ERROR).send(error_1.message)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function read(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, task, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = Number(req.params.id);
                    if (isNaN(Number(id)))
                        return [2 /*return*/, res.status(STATUS_CODE.BAD_REQUEST).send("Id must be a number")];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getTaskById(id)];
                case 2:
                    task = (_a.sent()).rows;
                    if (!task.length)
                        return [2 /*return*/, res.status(STATUS_CODE.NOT_FOUND).send("Task not found")];
                    return [2 /*return*/, res.status(STATUS_CODE.OK).send(task[0])];
                case 3:
                    error_2 = _a.sent();
                    return [2 /*return*/, res.status(STATUS_CODE.SERVER_ERROR).send(error_2.message)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, task, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = Number(req.params.id);
                    if (isNaN(Number(id)))
                        return [2 /*return*/, res.status(STATUS_CODE.BAD_REQUEST).send("Id must be a number")];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getTaskById(id)];
                case 2:
                    task = (_a.sent()).rows;
                    if (!task.length)
                        return [2 /*return*/, res.status(STATUS_CODE.NOT_FOUND).send("Task not found")];
                    if (task[0].status === "completed")
                        return [2 /*return*/, res.status(STATUS_CODE.CONFLICT).send("Task is already completed")];
                    return [4 /*yield*/, updateStatus(id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, res.status(STATUS_CODE.OK).send("Task completed")];
                case 4:
                    error_3 = _a.sent();
                    return [2 /*return*/, res.status(STATUS_CODE.SERVER_ERROR).send(error_3.message)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function delet(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, task, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = Number(req.params.id);
                    if (isNaN(Number(id)))
                        return [2 /*return*/, res.status(STATUS_CODE.BAD_REQUEST).send("Id must be a number")];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getTaskById(id)];
                case 2:
                    task = (_a.sent()).rows;
                    if (!task.length)
                        return [2 /*return*/, res.status(STATUS_CODE.NOT_FOUND).send("Task not found")];
                    return [4 /*yield*/, deleteTask(id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, res.status(STATUS_CODE.OK).send("Task was deleted")];
                case 4:
                    error_4 = _a.sent();
                    return [2 /*return*/, res.status(STATUS_CODE.SERVER_ERROR).send(error_4.message)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function aggregator(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, count, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = Number(req.params.id);
                    if (isNaN(Number(id)))
                        return [2 /*return*/, res.status(STATUS_CODE.BAD_REQUEST).send("Id must be a number")];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getUserById(id)];
                case 2:
                    user = (_a.sent()).rows;
                    if (!user.length)
                        return [2 /*return*/, res.status(STATUS_CODE.NOT_FOUND).send("User not found")];
                    return [4 /*yield*/, tasksByUser(id)];
                case 3:
                    count = (_a.sent()).rows;
                    return [2 /*return*/, res.status(STATUS_CODE.OK).send(count[0].quant)];
                case 4:
                    error_5 = _a.sent();
                    return [2 /*return*/, res.status(STATUS_CODE.SERVER_ERROR).send(error_5.message)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export { create, read, update, delet, aggregator };
