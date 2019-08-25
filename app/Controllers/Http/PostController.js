'use strict'

const Database = use('Database')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Tag = use('App/Models/Tag')

class PostController {
  async index({ view }) {
    // const posts = await Post.all()
    const posts = await Post
      .query()
      // 关联查询user表
      .with('user', builder => {
        builder.select('id', 'username')
      })
      .with('user.profile')
      .fetch()
    console.log(posts.toJSON())

    return view.render('post.index', { posts: posts.toJSON() })
  }

  async create({
    view
  }) {
    // 查询全部用户
    const users = await User.all()
    // 查询全部标签
    const tags = await Tag.all()

    return view.render('post.create', {
      users: users.toJSON(),
      tags: tags.toJSON()
    })
  }

  // 创建
  async store({
    request,
    response
  }) {
    // 获取到表单提交过来的参数
    const newPost = request.only(['title', 'content'])
    const tags = request.input('tags')
    // const postID = await Database.insert(newPost).into('posts')
    // console.log('postID: ', postID)
    // const post = await Post.create(newPost)
    // 根据提交的作者id 查询作者
    const user = await User.find(request.input('user_id'))
    const post = await user
      .posts()
      .create(newPost)

    await post
      .tags()
      .attach(tags)

    return response.redirect(`/posts/${ post.id }`)
  }

  // 查找
  async show({
    view,
    params
  }) {
    // const post = await Database
    //   .from('posts')
    //   .where('id', params.id)
    //   .first()

    const post = await Post.findOrFail(params.id)

    // 标签
    const tags = await post
      .tags()
      .select('id', 'title')
      .fetch()

    return view.render('post.show', {
      post,
      tags: tags.toJSON()
    })
  }

  // 修改
  async edit({
    view,
    params
  }) {
    // const post = await Database
    //   .from('posts')
    //   .where('id', params.id)
    //   .first()

    const post = await Post.findOrFail(params.id)

    return view.render('post.edit', {
      post: post.toJSON()
    })
  }

  // 更新
  async update({
    request,
    params
  }) {
    const updatedPost = request.only(['title', 'content'])
    // await Database
    //   .table('posts')
    //   .where('id', params.id)
    //   .update(updatedPost)

    const post = await Post.findOrFail(params.id)
    post.merge(updatedPost)
    post.save()
  }

  // 删除
  async destroy({
    request,
    params
  }) {
    // await Database
    //   .table('posts')
    //   .where('id', params.id)
    //   .delete()
    const post = await Post.findOrFail(params.id)
    post.delete()

    return 'success'
  }
}

module.exports = PostController