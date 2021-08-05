import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { UserService } from "src/user/service/user.service";
import { Observable } from "rxjs";
import { User } from "src/user/models/user.interface";
import { switchMap, map } from "rxjs/operators";
import { RequestService } from "../service/request/request.service";
import { RequestEntry } from "../model/request-entry.interface";


@Injectable()
export class  UserIsAuthorGuard implements CanActivate {

    constructor(private userService: UserService, private requestService: RequestService) {}

    canActivate(context: ExecutionContext): Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const requestEntryId: number = Number(params.id);
        const user: User = request.user;

        return this.userService.findOne(user.id).pipe(
            switchMap((user: User) => this.requestService.findOne(requestEntryId).pipe(
                map((requestEntry: RequestEntry) => {
                    let hasPermission = false;

                    if(user.id === requestEntry.author.id) {
                        hasPermission = true;
                    }

                    return user && hasPermission;
                })
            ))
        )       
    }
}