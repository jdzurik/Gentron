"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const results_1 = require("../results");
const __1 = require("../");
const constants_1 = require("../constants");
const MsSql = require("mssql/msnodesqlv8");
class MsSqlQueryProvider {
    onExecuteQueryFail(data, message, formatResults) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = {
                Error: {
                    Message: message,
                    Data: `${data}`
                }
            };
            const ret = {
                Json: (formatResults)
                    ? JSON.stringify(error, null, 4)
                    : JSON.stringify(error),
                Object: null,
                Xml: yield __1.Utilities.jsonToXmlStr(error, formatResults)
            };
            return results_1.Result.fail(message, ret);
        });
    }
    executeQuery(connStr, queryStr, formatResults = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let connPool = null;
            let recordsets;
            try {
                connPool = yield new MsSql.ConnectionPool(connStr);
                yield connPool.connect();
                const result = yield new MsSql.Request(connPool).query(queryStr);
                recordsets = yield result.recordset;
            }
            catch (e) {
                return yield this.onExecuteQueryFail(queryStr, __1.Utilities.getErrorMessage(e), formatResults);
            }
            finally {
                if (__1.Utilities.hasValue(connPool) && connPool.connected) {
                    yield connPool.close();
                }
            }
            if (!__1.Utilities.hasValue(recordsets)) {
                return yield this.onExecuteQueryFail(queryStr, constants_1.InfoMessages.QUERY_RESULTS_NULL, formatResults);
            }
            if (recordsets.length === 1) {
                const recordset = recordsets[0];
                const resultAsJson = recordset[MsSqlQueryProvider._jsonColumnId];
                if (__1.Utilities.hasValue(resultAsJson)) {
                    const ret = {
                        Json: (formatResults)
                            ? JSON.stringify(resultAsJson, null, 4)
                            : JSON.stringify(resultAsJson),
                        Object: resultAsJson,
                        Xml: yield __1.Utilities.jsonStrToXmlStr(JSON.stringify(resultAsJson), formatResults)
                    };
                    return results_1.Result.ok(ret);
                }
                const resultAsXml = recordset[MsSqlQueryProvider._xmlColumnId];
                if (__1.Utilities.hasValue(resultAsXml)) {
                    const jsonStr = __1.Utilities.xmlStrToJsonStr(resultAsXml, formatResults);
                    let jsonObj;
                    try {
                        jsonObj = JSON.parse(jsonStr);
                    }
                    catch (e) {
                        jsonObj = null;
                    }
                    const ret = {
                        Json: jsonStr,
                        Object: jsonObj,
                        Xml: (formatResults)
                            ? yield __1.Utilities.formatXml(resultAsXml)
                            : resultAsXml
                    };
                    return results_1.Result.ok(ret);
                }
            }
            const ret = {
                Json: (formatResults)
                    ? JSON.stringify(recordsets, null, 4)
                    : JSON.stringify(recordsets),
                Object: recordsets,
                Xml: yield __1.Utilities.jsonStrToXmlStr(JSON.stringify(recordsets), formatResults)
            };
            return results_1.Result.ok(ret);
        });
    }
}
MsSqlQueryProvider._jsonColumnId = "JSON_F52E2B61-18A1-11d1-B105-00805F49916B";
MsSqlQueryProvider._xmlColumnId = "XML_F52E2B61-18A1-11d1-B105-00805F49916B";
exports.default = MsSqlQueryProvider;
//# sourceMappingURL=MsSqlQueryProvider.js.map