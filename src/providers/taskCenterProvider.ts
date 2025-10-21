import {
  BaseRecord,
  CreateParams,
  CreateResponse,
  DataProvider,
  DeleteOneResponse,
  GetListResponse,
  GetOneResponse,
  UpdateParams,
  UpdateResponse,
} from "@refinedev/core";

export const taskCenterProvider: DataProvider = {
  getList: function <TData extends BaseRecord = BaseRecord>(): Promise<
    GetListResponse<TData>
  > {
    return Promise.resolve({
      data: [],
      total: 0,
    });
  },
  getOne: function <TData extends BaseRecord = BaseRecord>(): Promise<
    GetOneResponse<TData>
  > {
    return Promise.resolve({ data: { id: "1" } as TData });
  },
  create: function <TData extends BaseRecord = BaseRecord, TVariables = object>(
    params: CreateParams<TVariables>
  ): Promise<CreateResponse<TData>> {

    console.log("create taskCenter:",params)
    
    return Promise.resolve({
      data: {
        id: Math.random().toString(36).substring(2, 15), // Generate a simple mock ID
        ...params.variables,
      } as unknown as TData,
    });
  },
  update: function <TData extends BaseRecord = BaseRecord, TVariables = object>(
    params: UpdateParams<TVariables>
  ): Promise<UpdateResponse<TData>> {
    return Promise.resolve({
      data: {
        id: params.id,
        ...params.variables,
      } as unknown as TData,
    });
  },
  deleteOne: function <TData extends BaseRecord = BaseRecord>(): Promise<
    DeleteOneResponse<TData>
  > {
    throw new Error("Function not implemented.");
  },
  getApiUrl: function (): string {
    throw new Error("Function not implemented.");
  },
};
