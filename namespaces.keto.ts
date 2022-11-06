// comment in when editing. comment out when applying.
// import { Namespace, SubjectSet, Context } from "@ory/keto-namespace-types"

class User implements Namespace {
    related: {
        viewer: (User | Group)[]
        manager: (User | Group)[]
    }

    permits = {
        view: (ctx: Context): boolean =>
            this.related.viewer.includes(ctx.subject) ||
            this.related.viewer.traverse(p => p.permits.view(ctx)),
        edit: (ctx: Context): boolean => this.related.manager.includes(ctx.subject),
    }
}

class Group implements Namespace {
    related: {
        manager: (User | Group)[]
        member: (User | Group)[]
    }

    permits = {
        view: (ctx: Context): boolean =>
            this.related.member.includes(ctx.subject) ||
            this.related.member.traverse(p => p.permits.view(ctx)),
        edit: (ctx: Context): boolean => this.related.manager.includes(ctx.subject),
    }
}

class Organization implements Namespace {
    related: {
        member: (User | Group)[]
        manager: (User | Group)[]
    }

    permits = {
        view: (ctx: Context): boolean => this.related.member.includes(ctx.subject),
        edit: (ctx: Context): boolean => this.related.manager.includes(ctx.subject)
    }
}
