/**
 * globy-backend
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ClassesclassIdprojectsprojectIdmeetingsmeetingIdGroups } from './classesclassIdprojectsprojectIdmeetingsmeetingIdGroups';

export interface Meeting { 
    id?: string;
    project?: string;
    date?: Date;
    groupAssignments?: Meeting.GroupAssignmentsEnum;
    groups?: Array<ClassesclassIdprojectsprojectIdmeetingsmeetingIdGroups>;
    taskList?: Array<string>;
    duration?: number;
    joinUrl?: string;
}
export namespace Meeting {
    export type GroupAssignmentsEnum = 'tandem' | 'group3' | 'group4' | 'whole_class';
    export const GroupAssignmentsEnum = {
        Tandem: 'tandem' as GroupAssignmentsEnum,
        Group3: 'group3' as GroupAssignmentsEnum,
        Group4: 'group4' as GroupAssignmentsEnum,
        WholeClass: 'whole_class' as GroupAssignmentsEnum
    };
}