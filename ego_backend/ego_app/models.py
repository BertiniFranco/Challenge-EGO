from django.db import models


class Marca(models.Model):
    id = models.AutoField(primary_key=True, db_column='id', blank=False, null=False)
    marca = models.CharField(max_length=50, db_column='marca', blank=False, null=False)

    def __str__(self):
        return self.marca

    class Meta:
        managed = False
        db_table = 'marca'


class Categoria(models.Model):
    id = models.AutoField(primary_key=True, db_column='id', blank=False, null=False)
    categoria = models.CharField(max_length=50, db_column='categoria', blank=False, null=False)

    def __str__(self):
        return self.categoria

    class Meta:
        managed = False
        db_table = 'categoria'


class Caracteristica(models.Model):
    id = models.AutoField(primary_key=True, db_column='id', blank=False, null=False)
    caracteristica = models.CharField(max_length=50, db_column='caracteristica', blank=False, null=False)
    descripcion = models.TextField(max_length=255, db_column='descripcion', blank=False, null=False)

    def __str__(self):
        return self.caracteristica

    class Meta:
        managed = False
        db_table = 'caracteristica'


class Auto(models.Model):
    id = models.AutoField(primary_key=True, db_column='id', blank=False, null=False)
    marca = models.ForeignKey(Marca, models.RESTRICT, max_length=50, db_column='marca_id', blank=False, null=False)
    modelo = models.CharField(max_length=50, db_column='modelo', blank=False, null=False)
    anio = models.IntegerField(verbose_name='Año', db_column='año', blank=False, null=False)
    precio = models.DecimalField(max_digits=10, decimal_places=0, db_column='precio', blank=False, null=False)
    categoria = models.ForeignKey(Categoria, models.RESTRICT, db_column='categoria_id', blank=False, null=False)
    caracteristicas = models.ManyToManyField(Caracteristica, blank=True, through='AutoCaracteristica',
                                             through_fields=('auto', 'caracteristica'))

    def __str__(self):
        return self.marca.marca + '-' + self.modelo + '-' + str(self.anio)

    class Meta:
        managed = False
        db_table = 'auto'


class AutoCaracteristica(models.Model):
    # Django no permite la utilización de claves compuestas por lo que se establece 'primary_key=True' en
    # un solo campo. Para compensar esta limitación, se utiliza 'unique_together'.

    auto = models.ForeignKey(Auto, models.RESTRICT, primary_key=True, db_column='auto_id', blank=False, null=False)
    caracteristica = models.ForeignKey(Caracteristica, models.RESTRICT, db_column='caracteristica_id',
                                       blank=False, null=False)

    def __str__(self):
        return str(self.auto) + '__' + str(self.caracteristica)

    class Meta:
        managed = False
        db_table = 'auto_caracteristica'
        unique_together = (('auto', 'caracteristica'),)
