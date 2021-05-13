export async function findInAndNotInDBString(prisma, table, column, datas) {
    const formattedDatas = datas.map(data => data.trim().toLowerCase())
    const uniqueDatas = [...new Set(formattedDatas)]
    const resultDatas = await prisma.$queryRaw(`SELECT * FROM "${table}" WHERE LOWER("${column}") IN ('${uniqueDatas.join("' , '")}')`)
    const dataFromDb = resultDatas.map(dataFromDb => dataFromDb[column].toLowerCase())
    const nonDbDatas = uniqueDatas.filter( data => dataFromDb.indexOf(data) == -1)

    return [
        dataFromDb,
        nonDbDatas
    ]
}

export async function findInDb(prisma, table, column, datas) {
    const formattedDatas = datas.map(data => data.trim().toLowerCase())
    const uniqueDatas = [...new Set(formattedDatas)]
    const resultDatas = await prisma.$queryRaw(`SELECT * FROM "${table}" WHERE LOWER("${column}") IN ('${uniqueDatas.join("' , '")}')`)
    return resultDatas
}

