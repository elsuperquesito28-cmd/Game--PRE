import { type Static } from '@sinclair/typebox';
import { authResponse, authBody, GetGameIdResponse, gameIdqueryString } from './schemas.js';
type Success = Static<(typeof authResponse)[200]>;
type Error401 = Static<(typeof authResponse)[401]>;
type Error404 = Static<(typeof authResponse)[404]>;
export type AuthBodyType = Static<typeof authBody>;
export type AuthResponse = Success | Error401 | Error404;
export type GameReaponse = Static<(typeof GetGameIdResponse)[200]> | Static<(typeof GetGameIdResponse)[404]>;
export type GameIdQueryStringType = Static<typeof gameIdqueryString>;
export {};
//# sourceMappingURL=definitions.d.ts.map