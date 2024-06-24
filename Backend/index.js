const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())


app.listen(PORT, ()=> {
    console.log(`Server is running on http://www.localhost:${PORT}`)
})

// BOARD
// READ BOARD FROM ROOT DIRECTORY
app.get('/', async (req, res) => {
    res.redirect('/boards')
})

// READ BOARD FROM BOARDS DIRECTORY
app.get('/boards', async (req, res) => {
    const boards = await prisma.board.findMany()
    res.json(boards)
})

// CREATE NEW BOARD AT BOARDS DIRECTORY
app.post('/boards', async (req, res) => {
    const { name, image, category, authorName } = req.body

    if (!name || !image || !category || !authorName) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    if (typeof name !== 'string' || typeof image !== 'string' || typeof category !== 'string' || typeof authorName !== 'string') {
        return res.status(400).json({ error: 'All fields must be strings' });
    }

    if (name.length < 2 || authorName.length < 2) {
        return res.status(400).json({ error: 'Name and author name must be at least 2 characters' });
    }
    let newBoard;

    const existingAuthor = await prisma.author.findFirst({
        where: { name: authorName }
      })

    if (existingAuthor) {
    newBoard = await prisma.board.create({
        data: {
        name,
        image,
        category,
        author: {
            connect: { id: existingAuthor.id }
        }
        }
    })} else {
    newBoard = await prisma.board.create({
        data: {
        name,
        image,
        category,
        author: {
            create: { name: authorName }
        }
        }
    })}
    res.json(newBoard)
})

// SEARCH BOARDS TABLE BY NAME
app.post('/boards/search', async (req, res) => {
    const { searchQuery } = req.body;
    const results = await prisma.board.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      },
    });
    res.json(results);
});

// FILTER BOARDS BY CATEGORY
app.get('/boards/filter', async (req, res) => {
    const search = req.query.filter.toString().toUpperCase();
    if (search === 'ALL') {
        const boards = await prisma.board.findMany();
        res.json(boards)
    } else {
        const boards = await prisma.board.findMany({
            where: {
              category: search,
            },
        });
        res.json(boards);
    }
 });

// UPDATE BOARD AT BOARDS DIRECTORY
app.put('/boards/:boardId', async (req, res) => {
    const { boardId } = req.params
    const { name, image, category, author } = req.body

    if (!boardId) {
        res.status(400).json({ error: 'Invalid request' })
        return
    }

    try {
        const updateData = {
            name,
            image,
            category,
        }

        if (author) {
            updateData.author = author
        }

        const updatedBoard = await prisma.board.update({
            where: { id: parseInt(id) },
            data: updateData
        })
        res.json(updatedBoard)
    } catch(error) {
        res.status(500).json({ error: 'Failed to update board' })
    }
})

// DELETE BOARD AT BOARD DIRECTORY
app.delete('/boards/:boardId/delete', async (req, res) => {
    const { boardId } = req.params

    if (!boardId) {
        res.status(400).json({ error: 'Invalid Request' })
        return
    }

    try {
        const board = await prisma.board.findUnique({
            where: { id: parseInt(boardId) }
        })

        if (!board) {
            res.status(404).json({ error: 'Board not found' })
            return
        }

        await prisma.card.deleteMany({
            where: { boardId: parseInt(boardId) }
        })

        const deletedBoard = await prisma.board.delete({
            where: { id: parseInt(boardId) }
        })
        res.json(deletedBoard)
    } catch(error) {
        console.error('Error deleting board:', error)
        res.status(500).json({ error: 'Failed to delete board' })
    }

})


// CARD
// READ CARDS FROM CARDS DIRECTORY
app.get('/boards/:boardId/cards', async (req, res) => {
    const { boardId } = req.params

    try {
        const cards = await prisma.card.findMany({
            where: { boardId: parseInt(boardId) },
            orderBy: {
                id: 'asc'
            }
        })
        res.json(cards)
    } catch {
        res.status(500).json({ error: 'Failed to fetch cards' })
    }
})

// CREATE NEW CARD
app.post('/boards/:boardId/cards', async (req, res) => {
    const { boardId } = req.params
    const { name, image } = req.body

    if (!name || !image ) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    if (typeof name !== 'string' || typeof image !== 'string') {
        return res.status(400).json({ error: 'All fields must be strings' });
    }

    if (name.length < 2 ) {
        return res.status(400).json({ error: 'Name and author name must be at least 2 characters' });
    }

    const newCard = await prisma.card.create({
        data: {
            name,
            image,
            board: {
                connect: { id: parseInt(boardId) }
            }
        }
    })
    res.json(newCard)
})

// UPDATE CARD
app.put('/boards/:boardId/cards/:cardId', async (req, res) => {
    const { boardId, cardId } = req.params
    const { name, image } = req.body

    if (!boardId || !cardId) {
        res.status(400).json({ error: 'Invalid request' })
        return
    }

    try {
        const updatedCard = await prisma.card.update({
            where: { id: parseInt(cardId) },
            data: {
                name,
                image
            }
        })
        res.json(updatedCard)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update card' })
    }
})

// PATCH CARD, INCREMENT UPVOTE FIELD
app.patch('/boards/:boardId/cards/:cardId', async (req, res) => {
    const { boardId, cardId } = req.params
    const { upvote } = req.body

    if (!boardId || !cardId) {
        res.status(400).json({ error: "Invalid request" })
        return
    }

    try {
        const updatedUpvote = await prisma.card.update({
            where: { id: parseInt(cardId) },
            data: {
                upvote: {
                    increment: 1
                }
            }
        })
        res.json(updatedUpvote)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update upvotes'})
    }
})

// DELETE CARD
app.delete('/boards/:boardId/cards/:cardId/delete', async (req, res) => {
    const { boardId, cardId } = req.params

    if (!boardId || !cardId) {
        res.status(400).json({ error: 'Invalid request'})
        return
    }

    try {
            const card = await prisma.card.findUnique({
            where: { id: parseInt(cardId) }
        })

        if (!card) {
            res.status(404).json({ error: 'Card not found' })
            return
        }
        // await prisma.commment.deleteMany({
        //     where: { cardId: parseInt(cardId) }
        // })

        const deletedCard = await prisma.card.delete({
            where: { id: parseInt(cardId) }
        })
        res.json(deletedCard)
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete card' })
    }
})

// GET COMMENTS FOR A CARD
app.get('/boards/:boardId/cards/:cardId/comments', async (req, res) => {
    const { boardId, cardId } = req.params

    try {
        const comments = await prisma.comment.findMany({
            where: { cardId: parseInt(cardId) },
            orderBy: {
                id: 'asc'
            }
        })
        res.json(comments)
    } catch {
        res.status(500).json({ error: 'Failed to fetch comments' })
    }
})

// ADD NEW COMMENTS TO A CARD
app.post('/boards/:boardId/cards/:cardId/comments', async (req, res) => {
    const { boardId, cardId } = req.params
    const { text, authorName } = req.body
    let newComment;

    if (!text || !authorName ) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    if (typeof text !== 'string' || typeof authorName !== 'string') {
        return res.status(400).json({ error: 'All fields must be strings' });
    }

    if (text.length < 2 ) {
        return res.status(400).json({ error: 'Name and author name must be at least 2 characters' });
    }

    const existingAuthor = await prisma.author.findFirst({
        where: { name: authorName }
    })

    if(existingAuthor) {
        newComment = await prisma.comment.create({
            data: {
                text,
                author: {
                    connect: { id: existingAuthor.id }
                },
                card: {
                    connect: { id: parseInt(cardId) }
                },
        }})
    } else {
        newComment = await prisma.comment.create({
            data: {
                text,
                author: {
                    create: { name: authorName }
                },
                card: {
                    connect: { id: cardId}
                }
    }})}
    res.json(newComment);
})


app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({ error: err.message })
    } else if (err instanceof ForeignKeyConstraintError) {
        return res.status(err.statusCode).json({ error: err.message })
    } else if (err instanceof PrismaClient.PrismaClientKnownRequestError) {
      // Handle common Prisma errors (e.g., unique constraint violation)
      if (err.code === 'P2002') {
        return res.status(400).json({ error: "A unique constraint violation occurred." })
      }
    }

    res.status(500).json({ error: "Internal Server Error" })
})
