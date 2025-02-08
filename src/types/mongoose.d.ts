declare module "mongoose" {
  interface DocumentQuery<
    T,
    DocType extends import("mongoose").Document,
    QueryHelpers = {},
  > {
    mongooseCollection: {
      name: any;
    };
    cache(options: { key?: string }): this;
    useCache: boolean;
    hashKey: string;
  }

  interface Query<
    ResultType,
    DocType,
    THelpers = {},
    RawDocType = unknown,
    QueryOp = "find",
  > extends DocumentQuery<any, any> {}
}