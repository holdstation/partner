export interface UserPermission {
  identity: Identity;
  roles: Roles[];
}

export interface Identity {
  created_at: string;
  id: string;
  organization_id: any;
  schema_id: string;
  schema_url: string;
  state: string;
  state_changed_at: string;
  traits: Traits;
  updated_at: string;
}

export interface Traits {
  email: string;
  name: string;
}

export type Roles =
  | "partner_editor"
  | "partner_viewer"
  | "order_editor"
  | "order_viewer"
  | "admin"
  | "user_viewer"
  | "user_editor";
